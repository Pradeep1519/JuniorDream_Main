import { doc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

export type ApplicantType = "student" | "parent";

export interface AccountProfile {
  uid: string;
  name: string;
  email: string;
  platform?: "academic" | "professional";
  mobile: string;
  userType: ApplicantType;
  studentName: string;
  classApplying: string;
  previousSchool: string | null;
  applicationId: string;
  applicationPath: string;
  applicationStatus: string;
  stream: string;
  batchLevel: string | null;
  tier: string | null;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface EnrollmentRecord {
  status: string;
  courseName?: string;
  batchLevel?: string;
  duration?: string;
  startDate?: string;
}

export async function createApplicantAccount(email: string, password: string, displayName: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await updateProfile(credential.user, { displayName });
  } catch (error) {
    await deleteUser(credential.user).catch(() => undefined);
    throw error;
  }
  return credential.user;
}

export async function createProfessionalAccount(email: string, password: string, displayName: string) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await updateProfile(credential.user, { displayName });
    await setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      name: displayName,
      email,
      mobile: "",
      userType: "student",
      studentName: displayName,
      classApplying: "Professional",
      previousSchool: null,
      stream: "professional",
      batchLevel: null,
      tier: null,
      applicationId: "",
      applicationPath: "",
      applicationStatus: "account-only",
      platform: "professional",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    await deleteUser(credential.user).catch(() => undefined);
    throw error;
  }
  return credential.user;
}

export function makeApplicationId(prefix: string) {
  const year = new Date().getFullYear();
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
  return `${prefix}-${year}-${token}`;
}

export async function saveApplicantRecords(
  user: User,
  applicationId: string,
  profile: Omit<AccountProfile, "uid" | "applicationId" | "applicationPath" | "applicationStatus" | "createdAt" | "updatedAt">,
  application: Record<string, unknown>,
) {
  const applicationPath = `applications/${applicationId}`;
  await runTransaction(db, async (transaction) => {
    const userRef = doc(db, "users", user.uid);
    const applicationRef = doc(db, "applications", applicationId);
    const userSnapshot = await transaction.get(userRef);
    if (userSnapshot.exists()) {
      throw new Error("An application account already exists for this user.");
    }

    const createdAt = serverTimestamp();
    transaction.set(applicationRef, {
      ...application,
      applicationId,
      userId: user.uid,
      userType: profile.userType,
      applicantName: profile.name,
      studentName: profile.studentName,
      email: profile.email,
      status: "new",
      createdAt,
      updatedAt: serverTimestamp(),
    });
    transaction.set(userRef, {
      ...profile,
      uid: user.uid,
      applicationId,
      applicationPath,
      applicationStatus: "new",
      createdAt,
      updatedAt: serverTimestamp(),
    });
  });
}