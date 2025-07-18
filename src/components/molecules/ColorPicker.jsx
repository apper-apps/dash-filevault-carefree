import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ColorPicker = ({ onColorSelect, currentColor, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors = [
    { name: "blue", class: "bg-blue-500", textClass: "text-blue-600" },
    { name: "green", class: "bg-green-500", textClass: "text-green-600" },
    { name: "yellow", class: "bg-yellow-500", textClass: "text-yellow-600" },
    { name: "purple", class: "bg-purple-500", textClass: "text-purple-600" },
    { name: "pink", class: "bg-pink-500", textClass: "text-pink-600" },
    { name: "orange", class: "bg-orange-500", textClass: "text-orange-600" },
    { name: "red", class: "bg-red-500", textClass: "text-red-600" }
  ];

  const handleColorSelect = (color) => {
    onColorSelect(color.name);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 rounded hover:bg-neutral-200 transition-colors"
        title="Change folder color"
      >
        <ApperIcon name="Palette" className="w-4 h-4 text-neutral-600" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 min-w-[140px]">
            <div className="text-xs font-medium text-neutral-700 mb-2 px-2">
              Choose Color
            </div>
            <div className="grid grid-cols-4 gap-1">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                    color.class,
                    currentColor === color.name 
                      ? "border-neutral-900 ring-2 ring-neutral-200" 
                      : "border-neutral-300"
                  )}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;