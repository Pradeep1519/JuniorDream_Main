import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-foreground/90",
        outline: "border border-black text-black hover:bg-black/5",
        ghost: "hover:bg-black/5",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1 text-xs",
        lg: "h-12 px-8 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  children: React.ReactNode;
}

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
  if (href) {
    return (
      <Link
        to={href}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(props as any)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...(props as any)}
    >
      {children}
    </button>
  );
}