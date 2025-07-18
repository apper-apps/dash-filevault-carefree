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
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    ghost: "btn btn-ghost",
    outline: "btn btn-secondary"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
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