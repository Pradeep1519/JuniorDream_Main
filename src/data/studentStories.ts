export interface StudentStory {
  id: string;
  name: string;
  classLabel: string;
  image: string;
  category: string;
  interests: string[];
  skills: string[];
  journey: string;
  project: string;
  milestone: string;
  currentFocus: string;
  quote?: string;
  mentorConnection?: string;
  featured?: boolean;
  placeholder: boolean;
}

const storyImage = "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80";

export const studentStories: StudentStory[] = Array.from({ length: 6 }, (_, index) => ({
  id: `story-slot-${index + 1}`,
  name: "Student Story Coming Soon",
  classLabel: "Student journey",
  image: storyImage,
  category: "Student Growth",
  interests: ["Curiosity", "Exploration"],
  skills: ["Learning", "Problem solving"],
  journey: "This story will share a real student's starting point, learning journey and growth after verified information is available.",
  project: "Project details coming soon",
  milestone: "Milestone details coming soon",
  currentFocus: "Current interests coming soon",
  placeholder: true,
  featured: index === 0,
}));

export const storyCategories = ["All Stories", "Student Growth"];

export const journeySteps = [
  ["01", "Curious", "A question, an interest, or something worth exploring."],
  ["02", "Explore", "A safe place to try ideas without needing all the answers."],
  ["03", "Learn", "Guidance that helps concepts become clearer and more connected."],
  ["04", "Build", "A practical attempt that turns understanding into something visible."],
  ["05", "Grow", "More confidence, better questions, and a clearer next step."],
];
