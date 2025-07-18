import React, { useState, useRef, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ColorPicker = ({ onColorSelect, currentColor, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('right');
  const containerRef = useRef(null);
  
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

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 140; // min-w-[140px]
      const spaceOnRight = viewportWidth - rect.right;
      const spaceOnLeft = rect.left;
      
      // On mobile (< 768px), prioritize staying within viewport
      if (viewportWidth < 768) {
        if (spaceOnRight < dropdownWidth && spaceOnLeft > dropdownWidth) {
          setDropdownPosition('left');
        } else if (spaceOnRight < dropdownWidth && spaceOnLeft < dropdownWidth) {
          // Center the dropdown if both sides are constrained
          setDropdownPosition('center');
        } else {
          setDropdownPosition('right');
        }
      } else {
        // Desktop behavior: prefer right, fallback to left
        setDropdownPosition(spaceOnRight >= dropdownWidth ? 'right' : 'left');
      }
    }
  }, [isOpen]);

  const getDropdownClasses = () => {
    const baseClasses = "absolute top-8 z-20 bg-white rounded-lg shadow-xl border border-neutral-200 p-3 min-w-[140px] animate-in fade-in slide-in-from-top-2 duration-200";
    
    switch (dropdownPosition) {
      case 'left':
        return cn(baseClasses, "left-0");
      case 'center':
        return cn(baseClasses, "left-1/2 -translate-x-1/2");
      case 'right':
      default:
        return cn(baseClasses, "right-0");
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
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
          <div className={getDropdownClasses()}>
            <div className="text-xs font-medium text-neutral-700 mb-3 px-1">
              Choose Color
            </div>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-125 hover:shadow-md",
                    color.class,
                    currentColor === color.name 
                      ? "border-neutral-900 ring-2 ring-neutral-200 scale-110" 
                      : "border-neutral-300 hover:border-neutral-400"
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