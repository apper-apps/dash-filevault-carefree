import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ViewToggle = ({ view, onViewChange }) => {
  const views = [
    { key: "grid", icon: "Grid3X3", label: "Grid" },
    { key: "list", icon: "List", label: "List" }
  ];

  return (
    <div className="flex items-center bg-neutral-100 rounded-lg p-1">
      {views.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className={cn(
            "flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
            view === key
              ? "bg-white text-primary-600 shadow-sm"
              : "text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50"
          )}
        >
          <ApperIcon name={icon} className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;