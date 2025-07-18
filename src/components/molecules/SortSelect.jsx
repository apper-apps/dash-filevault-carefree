import React from "react";
import ApperIcon from "@/components/ApperIcon";

const SortSelect = ({ sortBy, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "size", label: "Size" },
    { value: "modified", label: "Modified" }
  ];

  return (
    <div className="flex items-center space-x-2">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value, sortOrder)}
        className="input text-sm py-1.5 px-3 pr-8 appearance-none bg-white"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <button
        onClick={() => onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")}
        className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
      >
        <ApperIcon 
          name={sortOrder === "asc" ? "ArrowUp" : "ArrowDown"} 
          className="w-4 h-4 text-neutral-600" 
        />
      </button>
    </div>
  );
};

export default SortSelect;