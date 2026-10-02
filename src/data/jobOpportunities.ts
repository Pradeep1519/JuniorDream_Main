import { professionalCourses } from "./professionalCourses";

export interface JobOpportunity {
  id: string;
  title: string;
  track: string;
  format: "Hiring Webinar" | "Interview Drive";
  timeline: string;
  summary: string;
  details: string[];
}

// Junior Dream hosts these hiring webinars / interview drives itself — no external or invented
// company names. Open to everyone, not just enrolled course students.
const featuredTrackTitles = [
  "Full Stack Web Dev",
  "Data Science & Analytics",
  "AI & Machine Learning",
  "Cloud Engineering",
  "Cybersecurity",
  "Software Engineering",
];

export const jobOpportunities: JobOpportunity[] = featuredTrackTitles.map((title, index) => {
  const course = professionalCourses.find((item) => item.title === title) ?? professionalCourses[index];
  return {
    id: `${course.slug}-drive`,
    title: `${course.title} — Hiring Webinar`,
    track: course.category,
    format: index % 2 === 0 ? "Hiring Webinar" : "Interview Drive",
    timeline: "Launching in the coming months",
    summary: `A live session connecting learners with real hiring conversations around ${course.title} roles.`,
    details: [
      `A guided walkthrough of what hiring teams look for in ${course.title} roles.`,
      "Open to everyone — Junior Dream course enrollment is not required to attend.",
      "Resume, portfolio, and interview-round guidance from the Junior Dream team.",
      "Junior Dream places its own course students and also runs this drive for non-students.",
      "Registration opens closer to the scheduled date.",
    ],
  };
});
