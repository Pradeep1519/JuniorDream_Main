export interface Tier {
  id: string;
  name: string; // "Essential" | "Advantage" | "Elite"
  monthlyFee: string; // "₹1,499/month"
  originalMonthlyFee?: string; // for strikethrough discount display
  highlight?: boolean;
  features: string[];
}

export interface EngineeringBatch {
  id: string;
  batchLevel: string; // "Dream Foundation"
  classRange: string; // "6-8"
  customName: string; // "Tech Buds"
  classes: number[]; // [6,7,8]
  schoolSubjects: string[];
  techTopics: string[];
  technologies: string[];
  certificates: string[];
  outcomes: string;
  tiers: Tier[];
}

const commonCoreFeatures = [
  "Live online classes by experienced faculty",
  "Recorded lectures for revision",
  "Weekly doubt-clearing sessions",
  "Printable notes & practice sheets",
];

const mentorshipFeature = "Free weekly mentorship from MNC industry professionals (TCS, American Express & more)";
const parentPortalFeature = "Parent Portal access — track attendance, marks & progress";

export const engineeringBatches: EngineeringBatch[] = [
  {
    id: "foundation",
    batchLevel: "Dream Foundation",
    classRange: "6-8",
    customName: "Tech Buds",
    classes: [6, 7, 8],
    schoolSubjects: ["Maths", "Science", "English", "Computer/IT"],
    techTopics: [
      "Computer fundamentals & typing",
      "Logical thinking & problem solving",
      "Intro to block-based coding (Scratch)",
      "Basic Python for kids",
    ],
    technologies: ["Scratch", "Python (beginner)", "MS Office basics"],
    certificates: ["Junior Dream Foundation Completion Certificate"],
    outcomes:
      "Strong fundamentals, coding curiosity, and comfort with computers — the base every future engineer needs.",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        monthlyFee: "₹1,499/month",
        originalMonthlyFee: "₹1,999/month",
        features: [...commonCoreFeatures, "Monthly progress report"],
      },
      {
        id: "advantage",
        name: "Advantage",
        monthlyFee: "₹1,999/month",
        originalMonthlyFee: "₹2,699/month",
        highlight: true,
        features: [
          ...commonCoreFeatures,
          "Monthly progress report",
          mentorshipFeature,
          parentPortalFeature,
          "Monthly assessment tests",
        ],
      },
      {
        id: "elite",
        name: "Elite",
        monthlyFee: "₹2,499/month",
        originalMonthlyFee: "₹3,499/month",
        features: [
          ...commonCoreFeatures,
          "Monthly progress report",
          mentorshipFeature,
          parentPortalFeature,
          "Monthly assessment tests",
          "1:1 doubt sessions",
          "Personality development sessions",
        ],
      },
    ],
  },
  {
    id: "explorer",
    batchLevel: "Dream Explorer",
    classRange: "9-10",
    customName: "Tech Explorers",
    classes: [9, 10],
    schoolSubjects: ["Maths", "Science", "English", "Social Science", "Computer/IT"],
    techTopics: [
      "Python & Java programming",
      "Web development basics (HTML, CSS, JS)",
      "Intro to Data Structures",
      "Board exam preparation (school syllabus)",
    ],
    technologies: ["Python", "Java", "HTML/CSS/JavaScript", "Git basics"],
    certificates: [
      "Junior Dream Explorer Completion Certificate",
      "Mini-Project Certificate",
    ],
    outcomes:
      "Real programming skills plus strong board-exam readiness, with a first taste of specializations to come.",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        monthlyFee: "₹1,799/month",
        originalMonthlyFee: "₹2,399/month",
        features: [...commonCoreFeatures, "Monthly progress report", "Board-exam aligned practice"],
      },
      {
        id: "advantage",
        name: "Advantage",
        monthlyFee: "₹2,399/month",
        originalMonthlyFee: "₹3,199/month",
        highlight: true,
        features: [
          ...commonCoreFeatures,
          "Monthly progress report",
          "Board-exam aligned practice",
          mentorshipFeature,
          parentPortalFeature,
          "Monthly assessment tests",
        ],
      },
      {
        id: "elite",
        name: "Elite",
        monthlyFee: "₹2,999/month",
        originalMonthlyFee: "₹3,999/month",
        features: [
          ...commonCoreFeatures,
          "Monthly progress report",
          "Board-exam aligned practice",
          mentorshipFeature,
          parentPortalFeature,
          "Monthly assessment tests",
          "1:1 doubt sessions",
          "Mini-project guidance & certificate",
        ],
      },
    ],
  },
  {
    id: "achiever",
    batchLevel: "Dream Achiever",
    classRange: "11-12",
    customName: "Engineering Excel",
    classes: [11, 12],
    schoolSubjects: ["Physics", "Chemistry", "Maths", "English"],
    techTopics: [
      "Software Development",
      "Data Engineering",
      "AI/ML Engineering",
      "DevOps & Cloud",
      "Networking",
      "Cybersecurity",
      "Coding interview prep",
      "System design foundations",
      "JEE-relevant problem solving",
    ],
    technologies: [
      "Python / Java / C++",
      "SQL & Databases",
      "Cloud basics (AWS/Azure intro)",
      "Git & GitHub",
      "AI/ML foundations",
    ],
    certificates: [
      "Junior Dream Achiever Completion Certificate",
      "Specialization Certificate (per chosen track)",
      "Industry Mentorship Certificate",
    ],
    outcomes:
      "Portfolio-ready projects, MNC-mentor guidance, and strong prep for JEE + tech careers.",
    tiers: [
      {
        id: "essential",
        name: "Essential",
        monthlyFee: "₹2,199/month",
        originalMonthlyFee: "₹2,999/month",
        features: [...commonCoreFeatures, "Monthly progress report", "JEE-pattern practice sheets"],
      },
      {
        id: "advantage",
        name: "Advantage",
        monthlyFee: "₹2,899/month",
        originalMonthlyFee: "₹3,899/month",
        highlight: true,
        features: [
          ...commonCoreFeatures,
          "Monthly progress report",
          "JEE-pattern practice sheets",
          mentorshipFeature,
          parentPortalFeature,
          "Monthly assessment tests",
        ],
      },
      {
        id: "elite",
        name: "Elite",
        monthlyFee: "₹3,499/month",
        originalMonthlyFee: "₹4,699/month",
        features: [
          ...commonCoreFeatures,
          "Monthly progress report",
          "JEE-pattern practice sheets",
          mentorshipFeature,
          parentPortalFeature,
          "Monthly assessment tests",
          "1:1 doubt sessions",
          "Specialization track & portfolio project",
          "Career/college counselling session",
        ],
      },
    ],
  },
];

export const BATCH_CYCLE = {
  startMonth: "September",
  endMonth: "February",
  note: "Fees are billed monthly, September through February. No lump-sum payment required.",
};

