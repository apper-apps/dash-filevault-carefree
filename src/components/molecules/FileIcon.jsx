import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FileIcon = ({ type, isFolder, className, folderColor }) => {
  const getIconAndColor = () => {
    if (isFolder) {
      const colorMap = {
        blue: "text-blue-600",
        green: "text-green-600", 
        yellow: "text-yellow-600",
        purple: "text-purple-600",
        pink: "text-pink-600",
        orange: "text-orange-600",
red: "text-red-600"
      };
      const colorClass = folderColor && colorMap[folderColor] ? colorMap[folderColor] : "text-primary-600";
      return { icon: "Folder", color: colorClass };
    }

    switch (type) {
      case "pdf":
        return { icon: "FileText", color: "text-red-600" };
      case "image":
        return { icon: "Image", color: "text-green-600" };
      case "video":
        return { icon: "Video", color: "text-purple-600" };
      case "document":
        return { icon: "FileText", color: "text-blue-600" };
      case "spreadsheet":
        return { icon: "FileSpreadsheet", color: "text-green-600" };
      case "presentation":
        return { icon: "FilePresentation", color: "text-orange-600" };
      case "archive":
        return { icon: "Archive", color: "text-orange-600" };
      case "executable":
        return { icon: "Download", color: "text-purple-600" };
      case "text":
        return { icon: "FileText", color: "text-neutral-600" };
      default:
        return { icon: "File", color: "text-neutral-600" };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <ApperIcon 
      name={icon} 
      className={cn(color, className)} 
    />
  );
};

export default FileIcon;