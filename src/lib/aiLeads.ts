import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CounsellorProfile, CourseRecommendation } from "@/data/aiCounsellor";
import { FirestoreCollections } from "@/lib/firestoreSchema";

export interface AILeadContact {
  name: string;
  email: string;
  mobile: string;
}

export async function saveAILead(
  leadId: string,
  profile: CounsellorProfile,
  contact: AILeadContact,
  recommendations: CourseRecommendation[],
  summary: string,
  consentGiven: boolean,
) {
  if (!consentGiven) throw new Error("Consent is required before saving contact details.");
  const leadRef = doc(db, FirestoreCollections.AI_LEADS, leadId);
  await setDoc(leadRef, {
    ...contact,
    userType: profile.userType,
    parentName: profile.userType === "parent" ? contact.name : "",
    childName: profile.childName,
    childClass: profile.classNumber ?? null,
    interestedSubjects: profile.subjectInterest,
    careerInterest: profile.careerInterest,
    learningGoal: profile.learningGoal,
    currentLevel: profile.currentLevel,
    recommendedCourses: recommendations.map(({ course, reason }) => ({
      courseId: course.id,
      title: course.title,
      reason,
    })),
    selectedCourse: recommendations[0]?.course.title ?? "",
    selectedBatch: recommendations[0]?.course.id ?? "",
    conversationSummary: summary,
    consentGiven: true,
    status: "AI Qualified",
    sourcePage: profile.sourcePage,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return leadRef.id;
}

export async function updateAILead(leadId: string, data: Record<string, unknown>) {
  await setDoc(doc(db, FirestoreCollections.AI_LEADS, leadId), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}
