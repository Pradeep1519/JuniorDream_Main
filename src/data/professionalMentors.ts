import type { MentorProfile } from "@/data/mentors";

export interface ProfessionalMentorProfile extends MentorProfile {
  company: string;
  designation: string;
  courseFocus: string;
  experience: string;
  location?: string;
  placeholder: false;
}

export const professionalMentors: ProfessionalMentorProfile[] = [
  {
    id: "mentor-sahil-singh",
    name: "Sahil Singh",
    currentRole: "Data Analyst",
    company: "Megamax",
    designation: "Data Analyst",
    courseFocus: "Data Science & Analytics",
    experience: "5+ years",
    specialization: ["Data Analysis"],
    bio: "Sahil Singh is a Data Analyst at Megamax with 5+ years of experience. At Junior Dream, he helps learners move through the analysis journey: shaping a useful question, examining the data, and communicating a clear takeaway. His guidance connects course concepts with the structured thinking students can practice in analytics projects.",
    mentoringFocus: "Framing analytical questions, checking data carefully, and explaining insights clearly through course projects.",
    image: "/assets/images/mentors/Sahil Singh.jpeg",
    verified: false,
    profileStatus: "Mentor details supplied by Junior Dream.",
    placeholder: false,
  },
  {
    id: "mentor-nadeem-dotnet",
    name: "Nadeem",
    currentRole: ".NET Developer",
    company: "Large MNC · name pending",
    designation: ".NET Developer",
    courseFocus: ".NET & Azure",
    experience: "4.8 years",
    specialization: [".NET Development", "Azure"],
    bio: "Nadeem is a .NET developer with 4.8 years of experience at a large multinational company. In Junior Dream's .NET & Azure course, he shares practical context as learners work through development concepts and projects. His guidance emphasizes clear explanations, step-by-step problem solving, and understanding why a solution works—not just copying the steps.",
    mentoringFocus: ".NET development concepts, project walkthroughs, and the reasoning behind everyday engineering decisions.",
    image: "/assets/images/mentors/nadeem.jpeg",
    verified: false,
    profileStatus: "Mentor details supplied by Junior Dream; employer name pending confirmation.",
    placeholder: false,
  },
  {
    id: "mentor-dheeraj-qa",
    name: "Dheeraj",
    currentRole: "QA & Automation Tester",
    company: "Company name pending",
    designation: "Software Tester",
    courseFocus: "QA & Automation Testing",
    experience: "5.3 years",
    specialization: ["Manual Testing", "Selenium", "Playwright", "JavaScript", "TestNG", "API Testing", "Git"],
    bio: "Dheeraj is a tester with 5.3 years of experience across manual and automation testing. In Junior Dream's QA & Automation Testing course, he guides learners through test case design, browser automation with Selenium and Playwright, API testing, and clear defect reporting. Practical exercises help students build a careful, quality-first way of thinking.",
    mentoringFocus: "Manual test design, Selenium and Playwright automation, API testing, and documenting test results clearly.",
    image: "/assets/images/mentors/dheeraj-web.jpeg",
    verified: false,
    profileStatus: "Role and experience supplied by Junior Dream; company name pending confirmation.",
    placeholder: false,
  },
  {
    id: "mentor-faizaan-frontend",
    name: "Faizaan",
    currentRole: "Frontend Developer",
    company: "Company name pending",
    designation: "Frontend Developer",
    courseFocus: "Frontend Development",
    experience: "3+ years",
    specialization: ["HTML", "CSS", "JavaScript", "React", "UI Implementation"],
    bio: "Faizaan is a frontend developer focused on turning product ideas into polished, responsive interfaces. In Junior Dream's frontend learning journey, he helps students understand layout thinking, user experience choices, and the difference between a working screen and a strong product experience. His guidance makes design and code feel connected and practical.",
    mentoringFocus: "Responsive UI design, interactive frontend logic, and building user-friendly interfaces with clean implementation.",
    image: "/assets/images/mentors/Faizaan.jpeg",
    verified: false,
    profileStatus: "Role and experience supplied by Junior Dream; company name pending confirmation.",
    placeholder: false,
  },
];