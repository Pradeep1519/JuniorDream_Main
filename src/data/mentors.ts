export interface MentorProfile {
  id: string;
  name: string;
  currentRole: string;
  company?: string;
  designation?: string;
  courseFocus?: string;
  experience?: string;
  location?: string;
  specialization: string[];
  bio: string;
  mentoringFocus: string;
  image: string;
  verified: boolean;
  placeholder?: boolean;
  profileStatus?: string;
}

const placeholderImage = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80";

export const mentors: MentorProfile[] = Array.from({ length: 10 }, (_, index) => ({
  id: `mentor-slot-${index + 1}`,
  name: "Mentor Profile Coming Soon",
  currentRole: "Industry Mentor",
  specialization: ["Engineering perspective", "Student guidance"],
  bio: "This profile will be updated when verified mentor information is available.",
  mentoringFocus: "Helping students connect concepts with thoughtful problem solving.",
  image: placeholderImage,
  verified: false,
  placeholder: true,
}));

export const mentorSpecializations = [
  "Software Engineering",
  "Data & Analytics",
  "Artificial Intelligence",
  "Cloud & Systems",
  "Cybersecurity",
  "Product Engineering",
];