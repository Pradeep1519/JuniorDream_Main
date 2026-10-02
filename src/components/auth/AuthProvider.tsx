import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { AccountProfile, EnrollmentRecord } from "@/lib/account";

interface AuthContextValue {
  user: User | null;
  profile: AccountProfile | null;
  enrollment: EnrollmentRecord | null;
  loading: boolean;
  profileLoading: boolean;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [enrollment, setEnrollment] = useState<EnrollmentRecord | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setLoading(false);
  }), []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setEnrollment(null);
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);
    let profileReady = false;
    let enrollmentReady = false;
    const finishLoading = () => {
      if (profileReady && enrollmentReady) setProfileLoading(false);
    };
    const unsubscribeProfile = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      setProfile(snapshot.exists() ? snapshot.data() as AccountProfile : null);
      profileReady = true;
      finishLoading();
    }, () => {
      setProfile(null);
      profileReady = true;
      finishLoading();
    });
    const unsubscribeEnrollment = onSnapshot(doc(db, "enrollments", user.uid), (snapshot) => {
      setEnrollment(snapshot.exists() ? snapshot.data() as EnrollmentRecord : null);
      enrollmentReady = true;
      finishLoading();
    }, () => {
      setEnrollment(null);
      enrollmentReady = true;
      finishLoading();
    });

    return () => {
      unsubscribeProfile();
      unsubscribeEnrollment();
    };
  }, [user]);

  const value: AuthContextValue = {
    user,
    profile,
    enrollment,
    loading,
    profileLoading,
    signOutUser: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}