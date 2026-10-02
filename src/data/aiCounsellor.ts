import { engineeringBatches, engineeringCourseCatalog, EngineeringCourseVariant } from "./engineeringCurriculum";
import { faqData, FAQItem } from "./faq";

export type UserType = "parent" | "student" | "unknown";
export type ConversationLanguage = "en" | "hi" | "hinglish";
export type RecommendationConfidence = "insufficient_information" | "qualified" | "high_confidence";

export interface CounsellorProfile {
  language: ConversationLanguage;
  userType: UserType;
  name: string;
  childName: string;
  classNumber?: number;
  subjectInterest: string;
  careerInterest: string;
  learningGoal: string;
  currentLevel: string;
  courseInterest: string;
  sourcePage: string;
  engineeringInterest: "yes" | "no" | "unknown";
}

export interface CourseRecommendation {
  course: EngineeringCourseVariant;
  reason: string;
  score: number;
}

export interface KnowledgeContext {
  currentPage: string;
  classLevel?: number;
  batch?: string;
  courseId?: string;
  course?: EngineeringCourseVariant;
}

export interface KnowledgeReply {
  answer: string;
  source: "faq" | "course" | "batch" | "general";
  shouldUse: boolean;
}

const uncertaintyPattern = /\b(pata nahi|pata nahin|don't know|do not know|not sure|unsure|maybe|no idea|can't decide|cannot decide|kuch samajh|abhi decide nahi|still exploring|not really sure|maloom nahi|confused|not decided|nahi pata)\b/i;

export function isUncertain(text: string) {
  return uncertaintyPattern.test(text.trim());
}

export function detectLanguage(text: string, previous: ConversationLanguage = "en"): ConversationLanguage {
  const value = text.toLowerCase();
  const hindiWords = ["mujhe", "hai", "ke", "liye", "batao", "bachcha", "beta", "beti", "pata", "nahi", "kaise", "kya", "course chahiye", "fees", "kitna", "kitni", "samajh", "namaste"];
  const englishWords = ["the", "what", "which", "course", "class", "fees", "help", "want", "looking", "please", "child", "student", "engineering"];
  const hindiHits = hindiWords.filter((word) => value.includes(word)).length;
  const englishHits = englishWords.filter((word) => value.includes(word)).length;
  if (hindiHits >= 2 && englishHits >= 1) return "hinglish";
  if (hindiHits >= 1 && englishHits === 0) return "hi";
  if (englishHits >= 1) return "en";
  return previous;
}

const classPattern = /(?:class|grade|std)\s*[-:]?\s*(6|7|8|9|10|11|12)\b|\b(6|7|8|9|10|11|12)(?:th|st|nd|rd)?\s*(?:class|grade)?\b/i;

export function extractClassNumber(text: string) {
  const match = text.match(classPattern);
  const value = match?.[1] ?? match?.[2];
  return value ? Number(value) : undefined;
}

export function detectUserType(text: string): UserType {
  const value = text.toLowerCase();
  if (/\b(parent|mother|mom|father|dad|child|son|daughter|bachche|bache|beta|beti|mere bete|meri beti)\b/.test(value)) return "parent";
  if (/\b(student|myself|mere liye|apne liye|i am|i'm|main|apne liye|student myself)\b/.test(value)) return "student";
  return "unknown";
}

export function getRecommendationConfidence(profile: CounsellorProfile): RecommendationConfidence {
  if (
    !profile.classNumber ||
    !profile.subjectInterest ||
    profile.subjectInterest === "unknown" ||
    !profile.learningGoal ||
    profile.learningGoal === "unknown" ||
    profile.engineeringInterest === "unknown"
  ) {
    return "insufficient_information";
  }
  if (profile.engineeringInterest === "yes" && profile.classNumber >= 9) return "high_confidence";
  return "qualified";
}

function includesAny(value: string, words: string[]) {
  return words.some((word) => value.toLowerCase().includes(word));
}

export function recommendCourses(profile: CounsellorProfile, currentCourse?: EngineeringCourseVariant): CourseRecommendation[] {
  if (getRecommendationConfidence(profile) === "insufficient_information") return [];
  const requestedClass = profile.classNumber ?? currentCourse?.classNumber;
  const interest = `${profile.subjectInterest} ${profile.careerInterest} ${profile.learningGoal}`.toLowerCase();
  const ranked = engineeringCourseCatalog.map((course) => {
    let score = 0;
    if (requestedClass === course.classNumber) score += 100;
    if (requestedClass && Math.abs(requestedClass - course.classNumber) === 1) score += 25;
    if (includesAny(interest, ["engineering", "jee", "career", "advanced", "ai", "software", "future"]) && course.classNumber >= 11) score += 22;
    if (includesAny(interest, ["coding", "python", "java", "web", "project"]) && course.classNumber >= 9) score += 15;
    if (includesAny(interest, ["computer", "math", "science", "logic", "foundation", "beginner"]) && course.classNumber <= 8) score += 15;
    if (includesAny(interest, ["beginner", "new", "start"]) && course.variantName === "Essential") score += 8;
    if (course.isPopular) score += 4;
    return { course, score };
  });

  const selected = ranked
    .sort((left, right) => right.score - left.score)
    .filter((item, index, items) => index === 0 || item.course.classNumber !== items[index - 1].course.classNumber)
    .slice(0, 3);

  return selected.map(({ course, score }) => ({
    course,
    score,
    reason: buildReason(course, profile),
  }));
}

function buildReason(course: EngineeringCourseVariant, profile: CounsellorProfile) {
  const learner = profile.userType === "parent" ? `${profile.childName || "your child"} is` : "you are";
  const classReason = profile.classNumber === course.classNumber
    ? `in Class ${course.classNumber}`
    : `looking at a pathway around Classes ${course.classRange}`;
  const interestReason = profile.subjectInterest
    ? ` and mentioned ${profile.subjectInterest} as an interest`
    : " and exploring technology learning";
  return `I am suggesting ${course.variantLabel} because ${learner} ${classReason}${interestReason}. It matches this stage with ${course.highlights.slice(0, 2).join(" and ").toLowerCase()}.`;
}

export function getLocalizedCopy(language: ConversationLanguage) {
  if (language === "hi") {
    return {
      identity: "Aap apne liye course dekh rahe hain ya apne child ke liye?",
      class: "Student abhi kis class mein hain?",
      interest: "Woh Maths, Science, Computer ya coding mein se kya enjoy karte hain?",
      goal: "Aapka main goal school academics, engineering foundation, ya dono hai?",
      uncertainty: "Koi baat nahi 😊 Abhi decide hona zaroori nahi. Student ko problem-solving, computers, ya creative projects mein se kya zyada pasand aata hai?",
      contact: "Agar aap chahen, toh counsellor detailed course information share kar sakte hain. Kya aap contact details save karwana chahenge?",
    };
  }
  if (language === "hinglish") {
    return {
      identity: "Are you exploring a course for yourself ya apne child ke liye?",
      class: "Student abhi kis class mein hai?",
      interest: "Maths, Science, Computer ya coding mein se kis taraf zyada interest hai?",
      goal: "Main goal school academics, engineering foundation, ya dono hai?",
      uncertainty: "No problem 😊 Abhi decide hona zaroori nahi. Problem-solving, computers ya creative projects mein se kuch pasand aata hai?",
      contact: "Agar aap chahen toh counsellor detailed course information share kar sakte hain. Kya main aapki details save kar loon?",
    };
  }
  return {
    identity: "Are you exploring a course for yourself or for your child?",
    class: "Which class is the student currently studying in?",
    interest: "Which areas does the student enjoy more: Maths, Science, computers, or coding?",
    goal: "Is your main goal stronger school academics, an engineering foundation, or both?",
    uncertainty: "That’s completely okay 😊 You don’t need to have decided yet. Do they enjoy problem-solving, computers, or creative projects more?",
    contact: "If you’d like, a counsellor can share detailed course information with you. Would you like to save your contact details for a follow-up?",
  };
}

export function getCourseFromPath(pathname: string) {
  const match = pathname.match(/\/programs\/engineering\/class-(\d+)\/(\d+-(?:essential|advantage|elite))/);
  if (!match) return undefined;
  return engineeringCourseCatalog.find((course) => course.classNumber === Number(match[1]) && course.id === match[2]);
}

export function getKnowledgeContext(pathname: string, currentCourse?: EngineeringCourseVariant, profile?: CounsellorProfile): KnowledgeContext {
  const course = currentCourse ?? getCourseFromPath(pathname);
  const classLevel = profile?.classNumber ?? extractClassNumber(pathname) ?? course?.classNumber;
  const batch = course?.batchLevel ?? (pathname.includes("essential") ? "Essential" : pathname.includes("advantage") ? "Advantage" : pathname.includes("elite") ? "Elite" : undefined);
  return {
    currentPage: getContextLabel(pathname),
    classLevel,
    batch,
    courseId: course?.id,
    course,
  };
}

function scoreFaqMatch(item: FAQItem, question: string, context: KnowledgeContext, profile?: CounsellorProfile) {
  const value = question.toLowerCase();
  const haystack = `${item.question} ${item.answer} ${item.category} ${item.classLevel ?? ""} ${item.keywords.join(" ")}`.toLowerCase();
  const batchName = context.batch?.toLowerCase();
  let score = 0;

  if (haystack.includes(value)) score += 60;
  for (const token of value.split(/\s+/).filter(Boolean)) {
    if (token.length < 3) continue;
    if (haystack.includes(token)) score += 5;
  }
  if (context.course && (item.course === "engineering" || item.batchId === context.course.batchId)) score += 35;
  if (context.classLevel && item.classLevel && item.classLevel.toLowerCase().includes(String(context.classLevel))) score += 18;
  if (batchName && item.keywords.some((keyword) => keyword.toLowerCase().includes(batchName))) score += 12;
  if (profile?.subjectInterest && item.keywords.some((keyword) => keyword.toLowerCase().includes(profile.subjectInterest.toLowerCase()))) score += 10;
  if (item.featured) score += 6;
  return score;
}

export function findRelevantKnowledge(question: string, pathname: string, profile?: CounsellorProfile): FAQItem[] {
  const context = getKnowledgeContext(pathname, getCourseFromPath(pathname), profile);
  const ranked = faqData
    .map((item) => ({ item, score: scoreFaqMatch(item, question, context, profile) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ item }) => item);

  return ranked.length > 0 ? ranked : faqData.slice(0, 2);
}

export function buildKnowledgeReply(question: string, profile: CounsellorProfile, currentCourse?: EngineeringCourseVariant, pathname = ""): KnowledgeReply {
  const lower = question.toLowerCase();
  const context = getKnowledgeContext(pathname, currentCourse, profile);
  const relevantFaqs = findRelevantKnowledge(question, pathname, profile);
  const currentClass = profile.classNumber ?? context.classLevel;

  if (/(fee|fees|price|cost|kitna|kitni|paisa|monthly fee)/i.test(lower)) {
    if (currentCourse) {
      return {
        answer: `${currentCourse.variantLabel} is currently listed at ${currentCourse.fee}. The program duration is ${currentCourse.duration} and it runs through ${currentCourse.learningMode.toLowerCase()}.`,
        source: "course",
        shouldUse: true,
      };
    }

    const bestMatch = relevantFaqs.find((item) => item.category === "fees" || item.keywords.some((word) => /(fee|fees|price|cost|monthly)/i.test(word)));
    if (bestMatch) {
      return { answer: bestMatch.answer, source: "faq", shouldUse: true };
    }

    return { answer: "I can help compare the available plan options for the relevant class. Tell me the student’s class and I’ll share the exact fee plan that matches it.", source: "general", shouldUse: true };
  }

  if (/(duration|how long|time|months|kitna samay|kitna time)/i.test(lower)) {
    if (currentCourse) {
      return { answer: `${currentCourse.variantLabel} runs for ${currentCourse.duration}.`, source: "course", shouldUse: true };
    }
    const batchMatch = engineeringBatches.find((batch) => batch.classes.includes(currentClass ?? 8));
    if (batchMatch) {
      return { answer: `${batchMatch.batchLevel} is a ${batchMatch.duration} program delivered through ${batchMatch.learningMode.toLowerCase()}.`, source: "batch", shouldUse: true };
    }
    return { answer: "I don’t have the exact duration for that option in front of me right now, but I can help you compare the available batches for the class you’re looking at.", source: "general", shouldUse: true };
  }

  if (/(curriculum|syllabus|what.*learn|learn.*what|subjects|topic|topics|what will.*learn)/i.test(lower)) {
    if (currentCourse) {
      const curriculumSummary = currentCourse.curriculum.map((section) => `${section.title}: ${section.items.join(", ")}`).join(". ");
      return { answer: `For ${currentCourse.variantLabel}, students focus on ${curriculumSummary}.`, source: "course", shouldUse: true };
    }
    const faqMatch = relevantFaqs.find((item) => item.category === "curriculum" || item.category === "engineering");
    if (faqMatch) return { answer: faqMatch.answer, source: "faq", shouldUse: true };
    return { answer: "I can explain the course curriculum once we confirm the student’s class and the batch they’re considering.", source: "general", shouldUse: true };
  }

  if (/(compare|difference|essential|advantage|elite)/i.test(lower)) {
    if (currentCourse) {
      const sameClassCourses = engineeringCourseCatalog.filter((course) => course.classNumber === currentCourse.classNumber && course.batchLevel === currentCourse.batchLevel);
      if (sameClassCourses.length > 1) {
        const sorted = sameClassCourses.sort((a, b) => a.title.localeCompare(b.title));
        return { answer: `The main difference is in the depth, mentorship and project support. ${sorted[0].variantLabel} is the starter option, while ${sorted[sorted.length - 1].variantLabel} adds more mentorship and advanced support.`, source: "batch", shouldUse: true };
      }
    }
    const faqMatch = relevantFaqs.find((item) => item.category === "fees" || item.question.toLowerCase().includes("difference"));
    if (faqMatch) return { answer: faqMatch.answer, source: "faq", shouldUse: true };
    return { answer: "The batch differences are mainly in depth, mentorship, doubt support, and project guidance. I can compare the available plans for the exact class you’re looking at.", source: "general", shouldUse: true };
  }

  if (/(what is junior dream|who are you|what is this program|what do you do|which program|which course)/i.test(lower)) {
    const faqMatch = relevantFaqs[0] ?? faqData.find((item) => item.id === "1");
    if (faqMatch) return { answer: faqMatch.answer, source: "faq", shouldUse: true };
  }

  if (relevantFaqs.length > 0) {
    const faqMatch = relevantFaqs[0];
    const answer = faqMatch.answer;
    if (answer && answer.length > 0) {
      return { answer, source: "faq", shouldUse: true };
    }
  }

  return { answer: "I don’t have the exact information for that right now. I can help you connect with the Junior Dream team for the correct details.", source: "general", shouldUse: true };
}

export function getContextLabel(pathname: string) {
  if (getCourseFromPath(pathname)) return "engineering batch details";
  if (pathname.startsWith("/programs/engineering")) return "engineering courses";
  if (pathname.startsWith("/programs")) return "Junior Dream programs";
  return "Junior Dream website";
}
