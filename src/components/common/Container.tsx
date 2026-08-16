import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-28",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}