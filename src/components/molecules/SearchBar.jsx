import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ value, onChange, placeholder = "Search files...", expanded, onExpandedChange }) => {
  const handleFocus = () => {
    onExpandedChange(true);
  };

  const handleBlur = () => {
    if (!value) {
      onExpandedChange(false);
    }
  };

  return (
    <div className={`relative transition-all duration-300 ease-out ${
      expanded ? 'transform scale-105' : ''
    }`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="w-4 h-4 text-neutral-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-primary-500 transition-all duration-300 ease-out ${
          expanded ? 'shadow-glow ring-2 ring-primary-200' : ''
        }`}
      />
{value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
        >
          <ApperIcon name="X" className="w-4 h-4 text-neutral-400 hover:text-neutral-600 transition-colors" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;