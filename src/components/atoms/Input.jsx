import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className,
  type = "text",
  ...props 
}, ref) => {
  return (
<input
      type={type}
      className={cn("input hover:shadow-sm focus:shadow-md", className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;