import { MentorProfile } from "@/data/mentors";

type MentorCardProps = MentorProfile;

export function MentorCard({ name, currentRole, specialization, image, placeholder }: MentorCardProps) {
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-border group cursor-pointer transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img src={image} alt="Mentor network placeholder" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-normal text-black" style={serif}>{name}</h3>
        <p className="text-sm text-foreground/60" style={sans}>{currentRole}</p>
        <p className="text-xs text-foreground/40 mt-2" style={sans}>{placeholder ? "Profile details coming soon" : specialization.join(" • ")}</p>
      </div>
    </div>
  );
}