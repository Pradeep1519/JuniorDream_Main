import { engineeringBatches } from "@/data/engineeringCurriculum";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  featured?: boolean;
  course?: string;
  classLevel?: string;
  batchId?: string;
  links?: Array<{ label: string; to: string }>;
}

export const faqCategoryLabels: Record<string, string> = {
  general: "General",
  courses: "Courses",
  engineering: "Engineering",
  curriculum: "Curriculum",
  batches: "Classes & Batches",
  learning: "Learning Experience",
  mentorship: "Mentorship",
  parents: "Parents",
  assessment: "Assessment & Progress",
  admissions: "Enrollment",
  fees: "Fees",
  technology: "Technology",
  support: "Support",
};

const existingFAQData: FAQItem[] = [
  {
    id: "1",
    question: "What is Junior Dream?",
    answer:
      "Junior Dream Private Limited is an online tutoring and mentorship platform for students in Class 6–12. We combine regular academic teaching with free weekly mentorship from real industry professionals, so students learn both their syllabus and how it connects to real careers.",
    category: "general",
    keywords: ["about", "platform", "students", "parents"],
    featured: true,
  },
  {
    id: "2",
    question: "Which programs are currently open for enrollment?",
    answer:
      "Right now, our Engineering program is open for enrollment across Class 6–12. Our Medical and Civil Services programs are launching soon — you can register your interest on their respective pages and we'll notify you the moment they open.",
    category: "courses",
    keywords: ["programs", "enrollment", "medical", "civil services"],
    featured: true,
    links: [{ label: "Explore programs", to: "/programs" }],
  },
  {
    id: "3",
    question: "How are students grouped into batches?",
    answer:
      "Students are placed into one of three batches based on their class: Dream Foundation (Class 6–8), Dream Explorer (Class 9–10), or Dream Achiever (Class 11–12). Each batch has its own curriculum, pace, and technology track suited to that age group.",
    category: "batches",
    keywords: ["class 6", "class 7", "class 8", "class 9", "class 10", "class 11", "class 12", "foundation", "explorer", "achiever"],
    featured: true,
    links: [{ label: "View engineering batches", to: "/programs/engineering" }],
  },
  {
    id: "4",
    question: "What exactly will my child be taught?",
    answer:
      "Every batch covers two things together: the regular school syllabus (aligned to CBSE, UP Board, and HBSE) and our specialization track. For Engineering, this includes computer fundamentals for younger students, and programming, data structures, AI/ML, and cybersecurity topics as students move into Class 9 and above.",
    category: "curriculum",
    keywords: ["class 6", "class 9", "school", "subjects", "technology", "engineering"],
    featured: true,
    links: [{ label: "Explore engineering courses", to: "/programs/engineering" }],
  },
  {
    id: "5",
    question: "What is the free mentorship program?",
    answer:
      "Every week, working professionals from companies like TCS and American Express meet students online at no additional cost. They explain current technology in simple terms, share what their day-to-day work looks like, and give students a realistic, up-to-date view of the field — something textbooks alone can't provide.",
    category: "mentorship",
    keywords: ["mentor", "industry", "weekly", "professionals", "guidance"],
    featured: true,
    links: [{ label: "Explore mentorship", to: "/mentorship" }],
  },
  {
    id: "6",
    question: "Do mentors also talk to parents?",
    answer:
      "Yes. Mentors and teachers regularly connect with parents to explain where a student is doing well and where they need more focus, so families aren't left guessing based on marks alone.",
    category: "parents",
    keywords: ["parent", "family", "progress", "mentor", "teacher"],
  },
  {
    id: "7",
    question: "How much does it cost?",
    answer:
      "We bill monthly rather than asking for a lump sum upfront. Each class has three plans — Essential, Advantage, and Elite — with different levels of mentorship access, testing, and support. Exact pricing for your child's class is shown after you select their class on the Programs page.",
    category: "fees",
    keywords: ["cost", "price", "monthly", "essential", "advantage", "elite", "plan"],
    featured: true,
    links: [{ label: "See current plans", to: "/programs/engineering" }],
  },
  {
    id: "8",
    question: "When does the academic cycle run?",
    answer:
      "Our batches run from September through February, with monthly billing throughout that period. There's no requirement to pay for the full cycle in advance.",
    category: "batches",
    keywords: ["academic cycle", "months", "billing", "payment"],
  },
  {
    id: "9",
    question: "Can I cancel or change plans mid-way?",
    answer:
      "Yes. Since fees are billed monthly, you can stop anytime by notifying us in writing — you simply won't be billed for future months. See our Terms of Service for full details.",
    category: "fees",
    keywords: ["cancel", "change plan", "billing", "terms"],
    links: [{ label: "Read the Terms of Service", to: "/terms" }],
  },
  {
    id: "10",
    question: "What certificates will my child receive?",
    answer:
      "Each batch has its own completion certificate, and Dream Achiever students (Class 11–12) also receive specialization certificates and an Industry Mentorship Certificate, useful for college applications and portfolios.",
    category: "courses",
    keywords: ["class 11", "class 12", "completion", "specialization", "certificate"],
  },
  {
    id: "11",
    question: "How can parents track progress?",
    answer:
      "Through our Parent Portal, parents can see attendance, test scores, and mentor feedback in one place, along with direct notifications — instead of waiting for a periodic report card.",
    category: "assessment",
    keywords: ["parents", "parent portal", "attendance", "test scores", "feedback", "progress"],
    featured: true,
  },
  {
    id: "12",
    question: "Who are the teachers?",
    answer:
      "Our teaching faculty are experienced educators who specialize in Class 6–12 curriculum. Mentors, separately, are practicing professionals from industry — the two roles are intentionally different so students get both strong fundamentals and real-world context.",
    category: "mentorship",
    keywords: ["teacher", "faculty", "mentor", "class 6", "class 12", "industry"],
  },
  {
    id: "13",
    question: "Are classes live or recorded?",
    answer:
      "Classes are conducted live online by our faculty, with recordings made available afterward so students can revisit any topic before tests or exams.",
    category: "learning",
    keywords: ["live", "online", "recordings", "classes", "revision"],
  },
  {
    id: "14",
    question: "How do I apply?",
    answer:
      "Go to the Programs page, choose Engineering, select your child's exact class, pick a plan, and click Apply. You can also apply directly from the Apply page. Our team will reach out on the mobile number provided to confirm next steps.",
    category: "admissions",
    keywords: ["apply", "application", "enroll", "admission", "class", "batch"],
    featured: true,
    links: [
      { label: "Choose a program", to: "/programs" },
      { label: "Start an application", to: "/apply" },
    ],
  },
  {
    id: "15",
    question: "What technology or equipment does my child need?",
    answer:
      "A laptop or desktop with a stable internet connection is recommended for the best experience with live classes and hands-on technical topics like coding. Classes can also be attended on a smartphone if needed.",
    category: "technology",
    keywords: ["device", "laptop", "computer", "internet", "coding", "phone"],
  },
];

const batchFAQData: FAQItem[] = engineeringBatches.flatMap((batch) => {
  const detailsLink = `/programs/engineering/class-${batch.classes[0]}/${batch.classes[0]}-essential`;
  const classLevel = `Classes ${batch.classRange}`;

  return [
    {
      id: `batch-${batch.id}-overview`,
      question: `What is ${batch.batchLevel} for ${classLevel}?`,
      answer: batch.description,
      category: "engineering",
      keywords: [batch.batchLevel, batch.customName, classLevel, "engineering", "course"],
      course: "engineering",
      classLevel,
      batchId: batch.id,
      links: [{ label: "View batch details", to: detailsLink }],
    },
    {
      id: `batch-${batch.id}-curriculum`,
      question: `What subjects and technology topics are covered in ${batch.batchLevel}?`,
      answer: `School subjects listed for this batch: ${batch.schoolSubjects.join(", ")}. Technology topics include: ${batch.techTopics.join(", ")}.`,
      category: "curriculum",
      keywords: [batch.batchLevel, classLevel, ...batch.schoolSubjects, ...batch.techTopics, "curriculum", "syllabus"],
      course: "engineering",
      classLevel,
      batchId: batch.id,
      links: [{ label: "Explore the engineering curriculum", to: detailsLink }],
    },
    {
      id: `batch-${batch.id}-learning`,
      question: `How are ${batch.batchLevel} classes delivered, and how long do they run?`,
      answer: `The listed duration is ${batch.duration}. The learning mode is ${batch.learningMode}.`,
      category: "learning",
      keywords: [batch.batchLevel, classLevel, batch.duration, batch.learningMode, "live", "classes", "online"],
      course: "engineering",
      classLevel,
      batchId: batch.id,
      links: [{ label: "View this batch", to: detailsLink }],
    },
    {
      id: `batch-${batch.id}-fees`,
      question: `What are the ${batch.batchLevel} plans and monthly fees?`,
      answer: batch.tiers
        .map((tier) => `${tier.name}: ${tier.monthlyFee}. Includes ${tier.features.join(", ")}.`)
        .join(" "),
      category: "fees",
      keywords: [batch.batchLevel, classLevel, "fee", "fees", "price", "monthly", ...batch.tiers.map((tier) => tier.name)],
      course: "engineering",
      classLevel,
      batchId: batch.id,
      links: [{ label: "Compare engineering plans", to: detailsLink }],
    },
  ];
});

export const faqData: FAQItem[] = [...existingFAQData, ...batchFAQData];
