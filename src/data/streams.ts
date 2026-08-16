export interface Stream {
  id: string;
  title: string;
  icon: string;
  description: string;
  active: boolean; // true = clickable & live, false = "Coming Soon"
  img: string;
}

export const streams: Stream[] = [
  {
    id: "engineering",
    title: "Engineering Excellence",
    icon: "🏗️",
    description:
      "Software Development, AI/ML, Cybersecurity, DevOps & Cloud, Data Engineering, and Networking — taught alongside your school syllabus.",
    active: true,
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "medical",
    title: "Medical Foundations",
    icon: "🏥",
    description:
      "NEET UG / AIIMS / JIPMER preparation with mentorship from practicing medical professionals.",
    active: false,
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: "civil-services",
    title: "Civil Services Leadership",
    icon: "🏛️",
    description:
      "IAS / IPS / UPSC CSE guidance from serving and retired officers.",
    active: false,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&auto=format",
  },
];
