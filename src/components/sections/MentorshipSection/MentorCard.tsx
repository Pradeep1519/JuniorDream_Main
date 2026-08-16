interface MentorCardProps {
  id: string;
  name: string;
  role: string;
  expertise: string;
  img: string;
  alt: string;
}

export function MentorCard({ name, role, expertise, img, alt }: MentorCardProps) {
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-border group cursor-pointer transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img src={img} alt={alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-normal text-black" style={serif}>{name}</h3>
        <p className="text-sm text-foreground/60" style={sans}>{role}</p>
        <p className="text-xs text-foreground/40 mt-2" style={sans}>Expertise: {expertise}</p>
      </div>
    </div>
  );
}