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
  batchLevel: string;
  classRange: string;
  customName: string;
  classes: number[];
  schoolSubjects: string[];
  techTopics: string[];
  technologies: string[];
  certificates: string[];
  outcomes: string;
  shortDescription: string;
  description: string;
  duration: string;
  learningMode: string;
  image: string;
  highlights: string[];
  learningOutcomes: string[];
  curriculum: Array<{ title: string; items: string[] }>;
  roadmap: Array<{ phase: string; title: string; description: string }>;
  teachingStrategy: Array<{ title: string; description: string }>;
  learningExperience: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  tiers: Tier[];
}

export interface EngineeringCourseVariant {
  id: string;
  classNumber: number;
  batchId: string;
  batchLevel: string;
  customName: string;
  classRange: string;
  variantName: string;
  variantLabel: string;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  learningMode: string;
  image: string;
  highlights: string[];
  targetStudents: string;
  learningOutcomes: string[];
  curriculum: Array<{ title: string; items: string[] }>;
  roadmap: Array<{ phase: string; title: string; description: string }>;
  teachingStrategy: Array<{ title: string; description: string }>;
  learningExperience: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  fee: string;
  originalFee?: string;
  features: string[];
  isPopular?: boolean;
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
    shortDescription:
      "A cheerful, confidence-building coding and digital skills batch for young learners in Classes 6 to 8.",
    description:
      "Dream Foundation is designed to make technology feel exciting and approachable for young learners. Students build computational thinking, digital confidence, and school-ready problem-solving skills while enjoying a structured journey that blends core academics with future-focused learning.",
    duration: "9 months",
    learningMode: "Live online classes + practice labs",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "School syllabus + coding basics",
      "Age-appropriate digital learning",
      "Mentored progress tracking",
    ],
    learningOutcomes: [
      "Build strong fundamentals in mathematics, logic, and computer literacy.",
      "Learn to think creatively and solve problems using visual coding tools.",
      "Gain confidence in digital tools, typing, presentation, and computing basics.",
      "Develop a future-ready mindset before moving into advanced tech tracks.",
    ],
    curriculum: [
      {
        title: "Coding Foundations",
        items: [
          "Computer awareness and digital safety",
          "Typing, navigation, and productivity basics",
          "Block coding with Scratch and logic patterns",
        ],
      },
      {
        title: "Problem Solving",
        items: [
          "Pattern recognition and analytical thinking",
          "Basic arithmetic and sequencing",
          "Creative puzzle-based challenges",
        ],
      },
      {
        title: "Digital Skills",
        items: [
          "Intro to Python for young learners",
          "MS Office and presentation literacy",
          "Mini projects and showcase activities",
        ],
      },
    ],
    roadmap: [
      { phase: "Month 1-2", title: "Build digital confidence", description: "Improve computer literacy, typing, and curiosity for technology." },
      { phase: "Month 3-4", title: "Think like a coder", description: "Develop logic, patterns, and beginner coding through guided activities." },
      { phase: "Month 5-6", title: "Create and present", description: "Create small interactive projects and present them confidently." },
      { phase: "Month 7-9", title: "Future-ready foundation", description: "Strengthen academics and move into advanced coding pathways with clarity." },
    ],
    teachingStrategy: [
      { title: "Basic", description: "Start from simple concepts and make every topic feel familiar and approachable." },
      { title: "Concept Building", description: "Connect school learning to practical tech thinking with demonstrations and exercises." },
      { title: "Practice", description: "Students work through guided tasks, worksheets, and mini challenges every week." },
      { title: "Advanced", description: "Once fundamentals are strong, learners progress to higher-order projects and deeper exploration." },
    ],
    learningExperience: [
      { title: "Live classes", description: "Interactive sessions with structured explanations and examples." },
      { title: "Study material", description: "Easy-to-understand worksheets, notes, and digital resources." },
      { title: "Assignments", description: "Weekly tasks to reinforce classroom concepts and build confidence." },
      { title: "Tests", description: "Short assessments to track progress and identify learning gaps." },
      { title: "Doubt solving", description: "Timely support for learners who need extra guidance and confidence." },
      { title: "Mentorship", description: "Guidance from mentors who inspire curiosity and purpose." },
    ],
    faqs: [
      {
        question: "What is the Dream Foundation batch for Classes 6 to 8?",
        answer: "Dream Foundation is a beginner-friendly engineering-and-digital-skills batch for students in Classes 6 to 8. It focuses on computer literacy, logical thinking, coding basics, and confidence-building so students are ready for more advanced technical learning later.",
      },
      {
        question: "Which students is this batch designed for?",
        answer: "This batch is designed for students who are curious about technology, want stronger digital confidence, and are starting their journey in coding. It is especially suitable for learners who are new to programming and want a structured, age-appropriate introduction.",
      },
      {
        question: "What will my child learn in this batch?",
        answer: "Students learn computer fundamentals, typing and keyboard shortcuts, logic building, block-based coding with Scratch, intro-level Python, and problem-solving through fun activities. The program also strengthens confidence with digital tools, creative thinking, and practical exposure to technology.",
      },
      {
        question: "Does this batch include real coding or just theory?",
        answer: "It includes hands-on coding practice through visual programming and beginner coding tasks. Students are not only taught concepts; they also work through guided activities and mini projects so they can apply what they learn in a practical way.",
      },
      {
        question: "Are school subjects and tech learning combined?",
        answer: "Yes. The batch connects school-relevant thinking with technology skills. Students build logical reasoning, flexibility with digital tools, and problem-solving habits that support both academics and future technical learning.",
      },
      {
        question: "How are the classes conducted?",
        answer: "Classes are conducted live online with a structured format that combines explanation, examples, guided practice, and short activities. The pace is designed to be comfortable for younger learners while still building real conceptual understanding.",
      },
      {
        question: "Does the batch include projects or practical activities?",
        answer: "Yes. Students work on mini projects, digital activities, and showcase tasks that help them apply concepts in a more creative and practical way. These activities make the learning experience more engaging and confidence-building.",
      },
      {
        question: "Is there support for doubts and student questions?",
        answer: "Yes. Students receive support through guided learning sessions and doubt-clearing practices, with learning support designed to make sure each child can move forward without feeling stuck. This is especially helpful for younger students who are still building coding confidence.",
      },
      {
        question: "How are students assessed and tracked?",
        answer: "Progress is monitored through regular assignments, practice tasks, and assessments. Parents and students are also informed through progress reporting so learning gaps can be identified early and supported with guidance.",
      },
      {
        question: "What is included in the fee and how can I enroll?",
        answer: "The fee covers live classes, learning resources, guided practice, assessments, and study support depending on the selected plan. Parents can apply directly through the enrollment link on the course page after choosing the batch and preferred plan.",
      },
    ],
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
    shortDescription:
      "A practical code-first journey for students in Classes 9 and 10 preparing for school success and future STEM pathways.",
    description:
      "Dream Explorer helps students move from interest to real capability. Students build programming confidence, understand core digital concepts, and strengthen school performance through a learning model that balances academic rigour with technology exposure and exploration.",
    duration: "10 months",
    learningMode: "Live classes + coding labs + revision",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Python, Java, and web basics",
      "Board exam alignment",
      "Mini projects and portfolio touchpoints",
    ],
    learningOutcomes: [
      "Develop confidence in programming fundamentals and project-building workflows.",
      "Improve conceptual clarity in maths, science, and coding-linked problem solving.",
      "Create beginner-level digital projects and presentations with real-world relevance.",
      "Prepare for higher-level tech learning and competitive academic pathways.",
    ],
    curriculum: [
      {
        title: "Programming Essentials",
        items: [
          "Python and Java foundations",
          "Control flow, functions, loops, and logic",
          "Introductory data structures and problem solving",
        ],
      },
      {
        title: "Web & Digital Skills",
        items: [
          "HTML, CSS, and JavaScript basics",
          "Project building for web interfaces",
          "Git basics and collaborative coding routines",
        ],
      },
      {
        title: "Academic Integration",
        items: [
          "Board-exam aligned practice",
          "School subject reinforcement with tech applications",
          "Mini projects and presentations",
        ],
      },
    ],
    roadmap: [
      { phase: "Month 1-2", title: "Code foundations", description: "Strengthen programming logic, syntax, and problem-solving habits." },
      { phase: "Month 3-4", title: "Build interfaces", description: "Create web pages and digital experiences with real output." },
      { phase: "Month 5-6", title: "Practice with depth", description: "Sharpen board-exam readiness and technical concepts together." },
      { phase: "Month 7-10", title: "Project momentum", description: "Build and refine portfolio-ready mini projects with mentor feedback." },
    ],
    teachingStrategy: [
      { title: "Basic", description: "Ground the learner in fundamentals before moving into more advanced problem-solving work." },
      { title: "Concept Building", description: "Link theory to real examples, labs, and school subject relevance." },
      { title: "Practice", description: "Students solve coding tasks, worksheets, and challenge-based assignments regularly." },
      { title: "Advanced", description: "As confidence grows, students work on projects that simulate real engineering thinking." },
    ],
    learningExperience: [
      { title: "Live classes", description: "Interactive sessions with coding walkthroughs and classroom problem solving." },
      { title: "Study material", description: "Concept sheets, excercises, and revision notes aligned to school learning." },
      { title: "Assignments", description: "Weekly practice tasks designed to build consistency and discipline." },
      { title: "Tests", description: "Progress checks for academics, coding, and project readiness." },
      { title: "Doubt solving", description: "No learner is left behind with targeted guidance on both theory and code." },
      { title: "Mentorship", description: "Career exploration and guidance for future STEM and engineering pathways." },
    ],
    faqs: [
      {
        question: "What is the Dream Explorer batch for Classes 9 and 10?",
        answer: "Dream Explorer is a code-first engineering batch for students in Classes 9 and 10. It focuses on building real programming confidence, digital creativity, and academic-tech integration so students become more prepared for advanced STEM and engineering pathways.",
      },
      {
        question: "Which students should choose this batch?",
        answer: "This batch is ideal for students who want to move beyond digital basics and gain practical exposure to coding, web development, and problem solving. It suits learners who want stronger technical confidence while staying aligned with school subjects and future career goals.",
      },
      {
        question: "What technologies and topics are covered?",
        answer: "Students work with Python and Java fundamentals, HTML, CSS, and JavaScript basics, introductory data structures, and coding logic. The program also supports board-exam alignment and connects technical learning with real school subject understanding.",
      },
      {
        question: "Does this batch help with school exam preparation?",
        answer: "Yes. The program is built to support both technical growth and school readiness. Students strengthen coding skills while also practising problem solving and concepts that support their academic performance in a more future-ready way.",
      },
      {
        question: "What kind of projects will students build?",
        answer: "Students create beginner-level digital projects such as interactive web pages, logic-based tools, and small software outputs. These projects help them understand how coding works in real life and create a tangible learning experience beyond classroom theory.",
      },
      {
        question: "How are the classes structured?",
        answer: "Classes are a mix of live instruction, coding labs, guided practice, and revision support. Students learn core concepts with examples, then apply them through exercises and mini projects so learning becomes practical rather than memorization-based.",
      },
      {
        question: "Will my child get enough practice after class?",
        answer: "Yes. The batch includes regular assignments, coding tasks, and revision-focused practice so students can revise concepts consistently. This helps them become more independent and confident with coding fundamentals.",
      },
      {
        question: "Is mentorship included in this batch?",
        answer: "Yes. Students receive mentorship support and guidance to help them think more clearly about technical direction, project work, and future STEM pathways. This support helps them build confidence and clarity beyond just code completion.",
      },
      {
        question: "How is progress monitored for Class 9 and 10 students?",
        answer: "Progress is tracked through tests, assignments, and project evaluation. Parents receive updates on learning outcomes so they can understand how their child is progressing in both academics and technical skill development.",
      },
      {
        question: "What is included in the fee and how can I enroll?",
        answer: "The fee includes live classes, revision support, coding labs, coursework, and performance tracking based on the selected plan. Parents can choose the appropriate plan and apply directly through the enrollment flow on the batch page.",
      },
    ],
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
    shortDescription:
      "A high-impact engineering preparation track for Classes 11 and 12 focused on advanced concepts, projects, and career readiness.",
    description:
      "Dream Achiever prepares students for advanced engineering pathways by combining rigorous academics with real-world tech learning. The program strengthens JEE-aligned problem solving, coding depth, systems thinking, and career vision so learners can move confidently toward engineering and technology careers.",
    duration: "12 months",
    learningMode: "Live classes + mentor sessions + project labs",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "JEE-aligned problem solving",
      "AI, cloud, cybersecurity, and software foundations",
      "Mentorship and project portfolio guidance",
    ],
    learningOutcomes: [
      "Develop strong analytical and technical depth required for engineering-focused preparation.",
      "Build confidence in coding, systems thinking, and emerging technology domains.",
      "Prepare for competitive exams while gaining insight into career pathways in tech.",
      "Create a sharper academic and professional direction for university and industry success.",
    ],
    curriculum: [
      {
        title: "Core Academic Depth",
        items: [
          "JEE-relevant problem solving in maths and physics",
          "Concept-building for chemistry and analytical reasoning",
          "Exam-oriented practice and revision frameworks",
        ],
      },
      {
        title: "Technology Specialization",
        items: [
          "Software development and coding interview foundations",
          "AI/ML, cloud, networking, and cybersecurity basics",
          "Data engineering and software systems fundamentals",
        ],
      },
      {
        title: "Career Readiness",
        items: [
          "Portfolio project guidance",
          "Mentor-led career discussions and counselling",
          "System design and communication fundamentals",
        ],
      },
    ],
    roadmap: [
      { phase: "Month 1-2", title: "Academic reinforcement", description: "Strengthen concepts in core school subjects and identify learning gaps." },
      { phase: "Month 3-4", title: "Tech depth", description: "Build strong coding fundamentals and work on applied problem-solving skills." },
      { phase: "Month 5-6", title: "Specialization runway", description: "Begin focused exploration in AI, development, cloud, and data areas." },
      { phase: "Month 7-12", title: "Career and exam acceleration", description: "Advance into project work, interview guidance, and regular benchmark-driven progress." },
    ],
    teachingStrategy: [
      { title: "Basic", description: "Revisit fundamentals to ensure concept clarity before moving into advanced work." },
      { title: "Concept Building", description: "Translate academic learning into applied engineering thinking with guided examples." },
      { title: "Practice", description: "Students solve advanced problems, assessments, and project tasks with mentor feedback." },
      { title: "Advanced", description: "Learners move into specialization, systems thinking, and real-world tech problem solving." },
    ],
    learningExperience: [
      { title: "Live classes", description: "High-value sessions combining academic depth and industry-relevant technology learning." },
      { title: "Study material", description: "Strategically organized notes, practice sets, and revision planners." },
      { title: "Assignments", description: "Regular tasks to build speed, accuracy, and advanced reasoning skills." },
      { title: "Tests", description: "Mock assessments and benchmark evaluations aligned to performance goals." },
      { title: "Doubt solving", description: "Supportive, focused mentoring for technical and academic challenges." },
      { title: "Mentorship", description: "Career guidance, learning strategy sessions, and industry exposure from mentors." },
    ],
    faqs: [
      {
        question: "What is the Dream Achiever batch for Classes 11 and 12?",
        answer: "Dream Achiever is an advanced engineering-preparation batch designed for students in Classes 11 and 12. It combines core academic depth with engineering-oriented technology learning, career guidance, and practical exposure to help learners prepare for future technical pathways.",
      },
      {
        question: "Which students is this batch meant for?",
        answer: "This batch is best suited for students aiming for engineering-focused higher education and technology careers. It is useful for learners who want stronger problem-solving skills, coding depth, and a clearer direction for JEE and future university or industry pathways.",
      },
      {
        question: "What does the curriculum include?",
        answer: "The program includes JEE-relevant problem solving, deeper exposure to mathematics and physics, technology domains such as software development, AI/ML, cloud, data, networking, and cybersecurity, and career-readiness modules that build practical understanding.",
      },
      {
        question: "How does it support engineering and JEE preparation?",
        answer: "Students build conceptual clarity and advanced problem-solving habits while also learning technical frameworks relevant to engineering. The learning model is designed to support both exam performance and long-term engineering readiness.",
      },
      {
        question: "Are specialization tracks included?",
        answer: "Yes. The batch introduces students to different engineering and technology pathways, including software development, AI/ML, data, cloud, networking, and cybersecurity. This helps them understand where their interests and strengths may align in future studies or careers.",
      },
      {
        question: "Are there live mentor sessions or one-to-one support?",
        answer: "Yes. Mentorship and doubt support are built into the experience to help students navigate both academic and technical challenges. This is especially valuable for learners who want focused guidance while building a stronger future roadmap.",
      },
      {
        question: "What kind of projects do students work on?",
        answer: "Students work on portfolio-oriented project guidance and technical assignments related to their chosen areas of interest. These projects support practical understanding and give students a more tangible representation of their skills.",
      },
      {
        question: "How is student progress tracked?",
        answer: "The batch includes regular assessments, benchmark evaluations, and progress reporting so students and parents can track how their child is performing across academic and technical dimensions. This helps identify gaps early and improve focus.",
      },
      {
        question: "Will students get career guidance?",
        answer: "Yes. Career and college counselling support is part of the experience, paired with mentor guidance, so students can better understand realistic engineering and technology pathways and make informed decisions about their future.",
      },
      {
        question: "What does the fee include and how do I apply?",
        answer: "The fee covers live classes, supported learning resources, assessments, mentor interaction, and project-oriented support depending on the selected plan. Parents can choose the most suitable plan and proceed with the application process through the batch enrollment form.",
      },
    ],
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

export const engineeringCourseCatalog: EngineeringCourseVariant[] = engineeringBatches.flatMap((batch) =>
  batch.classes.flatMap((classNumber) =>
    batch.tiers.map((tier) => ({
      id: `${classNumber}-${tier.id}`,
      classNumber,
      batchId: batch.id,
      batchLevel: batch.batchLevel,
      customName: batch.customName,
      classRange: batch.classRange,
      variantName: tier.name,
      variantLabel: `${tier.name} Batch`,
      title: `Class ${classNumber} · ${tier.name}`,
      shortDescription: batch.shortDescription,
      description: batch.description,
      duration: batch.duration,
      learningMode: batch.learningMode,
      image: batch.image,
      highlights: batch.highlights,
      targetStudents:
        classNumber >= 6 && classNumber <= 8
          ? "Students in Classes 6–8 who want a strong foundation in digital literacy and technical thinking."
          : classNumber >= 9 && classNumber <= 10
            ? "Students in Classes 9–10 who want stronger coding confidence and academic-tech integration."
            : "Students in Classes 11–12 preparing for advanced engineering, JEE-aligned learning, and future tech pathways.",
      learningOutcomes: batch.learningOutcomes,
      curriculum: batch.curriculum,
      roadmap: batch.roadmap,
      teachingStrategy: batch.teachingStrategy,
      learningExperience: batch.learningExperience,
      faqs: batch.faqs,
      fee: tier.monthlyFee,
      originalFee: tier.originalMonthlyFee,
      features: tier.features,
      isPopular: tier.highlight,
    })),
  ),
);

export const BATCH_CYCLE = {
  startMonth: "September",
  endMonth: "February",
  note: "Fees are billed monthly, September through February. No lump-sum payment required.",
};

