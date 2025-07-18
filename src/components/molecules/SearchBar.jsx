import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ value, onChange, placeholder = "Search files...", expanded, onExpandedChange }) => {
  const handleFocus = () => {
    onExpandedChange(true);
  };

  const handleBlur = (e) => {
    // Small delay to prevent collapse during clear button click
    setTimeout(() => {
      if (!value && !e.relatedTarget?.closest('.search-clear-btn')) {
        onExpandedChange(false);
      }
    }, 100);
  };

  const handleClick = () => {
    if (!expanded) {
      onExpandedChange(true);
    }
  };

  return (
    <div className={`relative transition-all duration-300 ease-out search-container ${
      expanded ? 'search-expanded' : 'search-collapsed'
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
        onClick={handleClick}
        className={`pl-10 pr-10 py-2 w-full focus:ring-2 focus:ring-primary-500 transition-all duration-300 ease-out text-sm ${
          expanded ? 'shadow-glow ring-2 ring-primary-200 bg-white' : 'bg-white hover:bg-primary-50'
        } ${value ? 'text-neutral-900' : ''}`}
        style={{
          minWidth: expanded ? '300px' : 'auto'
        }}
      />
      {value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="search-clear-btn absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200 z-10"
        >
          <ApperIcon name="X" className="w-4 h-4 text-neutral-400 hover:text-neutral-600 transition-colors" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;