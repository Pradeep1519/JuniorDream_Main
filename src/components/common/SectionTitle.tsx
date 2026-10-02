interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionTitle({ label, title, description, className }: SectionTitleProps) {
  return (
    <div className={className}>
      {label && (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-[0.35em] uppercase text-foreground/40" style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}>
            {label}
          </span>
          <span className="w-8 h-px bg-foreground/20" />
        </div>
      )}
      <h2
        className="text-3xl md:text-4xl font-normal leading-tight text-black"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {description && (
        <p className="text-foreground/60 mt-4 max-w-2xl" style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}>
          {description}
        </p>
      )}
    </div>
  );
}