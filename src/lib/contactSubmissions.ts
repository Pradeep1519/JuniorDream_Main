import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirestoreCollections } from "@/lib/firestoreSchema";

export type ContactUserType = "student" | "parent" | "other";
export type ContactInterest = "engineering" | "academic_courses" | "mentorship" | "admissions" | "general";

export interface ContactSubmissionInput {
  name: string;
  email: string;
  mobile: string;
  userType: ContactUserType;
  classLevel: string;
  interestedIn: ContactInterest;
  message: string;
}

export async function saveContactSubmission(input: ContactSubmissionInput) {
  const submission = await addDoc(collection(db, FirestoreCollections.CONTACT_SUBMISSIONS), {
    ...input,
    sourcePage: "contact",
    status: "new",
    consentGiven: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return submission.id;
}