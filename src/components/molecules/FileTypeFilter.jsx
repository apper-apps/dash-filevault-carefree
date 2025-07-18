import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const FileTypeFilter = ({ fileTypeFilter, onFilterChange }) => {
  const filterOptions = [
    { value: 'all', label: 'All Files', icon: 'Files' },
    { value: 'images', label: 'Images', icon: 'Image' },
    { value: 'documents', label: 'Documents', icon: 'FileText' },
    { value: 'videos', label: 'Videos', icon: 'Video' },
    { value: 'audio', label: 'Audio', icon: 'Music' },
    { value: 'archives', label: 'Archives', icon: 'Archive' },
    { value: 'other', label: 'Other', icon: 'File' }
  ];

  const currentFilter = filterOptions.find(option => option.value === fileTypeFilter);

  return (
    <div className="relative">
      <select
        value={fileTypeFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="appearance-none bg-white border border-neutral-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors min-w-[120px]"
      >
        {filterOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-neutral-400" />
      </div>
    </div>
  );
};

export default FileTypeFilter;