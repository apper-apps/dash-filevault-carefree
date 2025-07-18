import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className,
  variant = "default",
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-neutral-100 text-neutral-800",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    pdf: "bg-red-100 text-red-800",
    image: "bg-green-100 text-green-800",
    video: "bg-purple-100 text-purple-800",
    document: "bg-blue-100 text-blue-800",
    archive: "bg-orange-100 text-orange-800",
    folder: "bg-primary-100 text-primary-800"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;