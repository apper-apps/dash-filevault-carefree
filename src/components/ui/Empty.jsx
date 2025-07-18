import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No files found",
  description = "This folder is empty. Start by adding some files or folders.",
  action,
  actionLabel = "Add Files",
  icon = "FolderOpen"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
        {title}
      </h3>
      
      <p className="text-neutral-600 mb-8 max-w-md">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action}
          className="btn btn-primary flex items-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
      
      <div className="mt-8 p-4 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300">
        <div className="flex items-center justify-center space-x-2 text-neutral-500">
          <ApperIcon name="Upload" className="w-5 h-5" />
          <span className="text-sm">Or drag and drop files here</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;