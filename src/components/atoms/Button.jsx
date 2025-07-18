import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className,
  variant = "primary",
  size = "default",
  children,
  ...props 
}, ref) => {
const variants = {
    primary: "btn btn-primary hover:shadow-lg",
    secondary: "btn btn-secondary hover:shadow-lg",
    ghost: "btn btn-ghost hover:shadow-sm",
    outline: "btn btn-secondary hover:shadow-lg"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs min-h-[32px]",
    default: "px-4 py-2 text-sm min-h-[40px]",
    lg: "px-6 py-3 text-base min-h-[48px]"
  };

  return (
    <button
      className={cn(
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;