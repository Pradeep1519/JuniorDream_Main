export interface Course {
  id: string;
  name: string;
  description: string;
  tools: string[];
  duration: string;
  format: string;
  projects: number;
}

export const courses: Course[] = [
  {
    id: "full-stack-development",
    name: "Full Stack Development",
    description:
      "Build and deploy complete web applications, from interface to database.",
    tools: ["HTML/CSS", "JavaScript", "React", "Node.js", "SQL", "Git"],
    duration: "6 months",
    format: "Live",
    projects: 3,
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description:
      "Turn raw data into clear business decisions using SQL, Excel and dashboards.",
    tools: ["Excel", "SQL", "Python", "Power BI", "Statistics"],
    duration: "5 months",
    format: "Live",
    projects: 3,
  },
  {
    id: "data-science",
    name: "Data Science",
    description:
      "Analyze data and build models to uncover patterns and predictions.",
    tools: ["Python", "Pandas", "Statistics", "SQL", "Visualization"],
    duration: "6 months",
    format: "Live",
    projects: 4,
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description:
      "Design and train models that power recommendations, forecasts and automation.",
    tools: ["Python", "Scikit-learn", "TensorFlow", "Math for ML"],
    duration: "7 months",
    format: "Live",
    projects: 4,
  },
];
