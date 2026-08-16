interface TestimonialCardProps {
  id: string;
  name: string;
  role: string;
  quote: string;
  img: string;
  alt: string;
}

export function TestimonialCard({ name, role, quote, img, alt }: TestimonialCardProps) {
  const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;
  const sans = { fontFamily: "'Inter', Helvetica, Arial, sans-serif" } as const;

  return (
    <div className="bg-secondary rounded-lg p-6 border border-border">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img src={img} alt={alt} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-black" style={serif}>{name}</h4>
          <p className="text-xs text-foreground/50" style={sans}>{role}</p>
        </div>
      </div>
      <p className="text-sm text-foreground/70 leading-relaxed italic" style={sans}>
        "{quote}"
      </p>
    </div>
  );
}