import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { makeApplicationId } from "@/lib/account";

export type ApplicationStatus = "new" | "under_review" | "accepted" | "rejected";
export type PaymentStatus = "pending" | "initiated" | "successful" | "failed" | "cancelled" | "refunded";

export interface ProfessionalCourseApplicationInput {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  educationLevel: string;
  college: string;
  degree: string;
  graduationYear: string;
  courseId: string;
  courseName: string;
  courseDuration?: string;
  courseFee?: number;
  emiPlan?: string | null;
  experienceLevel: string;
  technicalExperience: string;
  careerGoal: string;
  sourcePage: string;
}

const COLLECTION = "professional_course_applications";

// Mirrors the aiLeads.ts / contactSubmissions.ts pattern: explicit doc id, serverTimestamp, status fields.
export async function createProfessionalApplication(userId: string | null, input: ProfessionalCourseApplicationInput) {
  const applicationId = makeApplicationId("JD-PRO");
  const applicationRef = doc(db, COLLECTION, applicationId);

  await setDoc(applicationRef, {
    applicationId,
    userId: userId ?? null,
    ...input,
    courseDuration: input.courseDuration ?? null,
    courseFee: input.courseFee ?? null,
    courseCode: input.courseId,
    applicationStatus: "new" as ApplicationStatus,
    paymentStatus: "pending" as PaymentStatus,
    paymentOrderId: null,
    paymentTransactionId: null,
    paymentAmount: input.courseFee ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return applicationId;
}

export async function updateProfessionalApplicationPayment(
  applicationId: string,
  data: Partial<{ paymentStatus: PaymentStatus; paymentOrderId: string | null; paymentTransactionId: string | null }>
) {
  await setDoc(doc(db, COLLECTION, applicationId), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getProfessionalApplication(applicationId: string) {
  const snapshot = await getDoc(doc(db, COLLECTION, applicationId));
  return snapshot.exists() ? snapshot.data() : null;
}
