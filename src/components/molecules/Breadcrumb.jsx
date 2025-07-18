import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Breadcrumb = ({ path, onNavigate }) => {
  const pathSegments = path === "/" ? [] : path.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1 text-sm text-neutral-600">
      <button
        onClick={() => onNavigate("/")}
        className={cn(
          "flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-neutral-100 transition-colors",
          path === "/" && "text-primary-600 bg-primary-50"
        )}
      >
        <ApperIcon name="Home" className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      {pathSegments.map((segment, index) => {
        const segmentPath = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        
return (
          <div key={segmentPath} className="flex items-center">
            <ApperIcon name="ChevronRight" className="w-4 h-4 text-neutral-400" />
            <button
              onClick={() => onNavigate(segmentPath)}
              className={cn(
                "px-2 py-1 rounded-md hover:bg-neutral-100 transition-colors",
                isLast && "text-primary-600 bg-primary-50"
              )}
            >
              {segment}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;