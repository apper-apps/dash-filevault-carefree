import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FileIcon from "@/components/molecules/FileIcon";
import ColorPicker from "@/components/molecules/ColorPicker";
import { formatDate, formatFileSize } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const FileList = ({ 
  files, 
  selectedFiles, 
  onFileClick, 
  onFileDoubleClick,
  onFileSelect,
  onRename,
  onDelete,
  onColorChange,
  sortBy,
  sortOrder,
  onSortChange
}) => {
  const sortableColumns = [
    { key: "name", label: "Name" },
    { key: "size", label: "Size" },
    { key: "modified", label: "Modified" }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      onSortChange(column, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(column, "asc");
    }
  };

return (
    <div className="bg-gradient-to-br from-white via-primary-50 to-accent-50 rounded-lg border border-primary-200 overflow-hidden shadow-smooth">
{/* Header */}
      <div className="border-b border-primary-200 bg-gradient-to-r from-primary-100 to-accent-100">
        <div className="grid grid-cols-12 gap-2 lg:gap-4 px-4 lg:px-6 py-2 lg:py-3 text-sm font-medium text-neutral-700">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedFiles.length === files.length && files.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  files.forEach(file => onFileSelect(file.Id));
                } else {
                  selectedFiles.forEach(id => onFileSelect(id));
                }
              }}
              className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
            />
          </div>
          {sortableColumns.map(column => (
            <div
              key={column.key}
              className={cn(
                "cursor-pointer hover:text-neutral-900 transition-colors flex items-center space-x-1",
                column.key === "name" ? "col-span-6" : "col-span-2"
              )}
              onClick={() => handleSort(column.key)}
            >
              <span>{column.label}</span>
              {sortBy === column.key && (
                <ApperIcon 
                  name={sortOrder === "asc" ? "ArrowUp" : "ArrowDown"} 
                  className="w-4 h-4" 
                />
              )}
            </div>
          ))}
          <div className="col-span-1"></div>
        </div>
      </div>

{/* File rows */}
      <div className="divide-y divide-primary-100">
        {files.map((file, index) => (
          <motion.div
            key={file.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
            className={cn(
              "grid grid-cols-12 gap-2 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 cursor-pointer transition-all duration-200 group hover:shadow-smooth mobile-compact",
              selectedFiles.includes(file.Id) && "bg-gradient-to-r from-primary-100 to-accent-100 shadow-smooth"
            )}
            onClick={() => onFileClick(file)}
            onDoubleClick={() => onFileDoubleClick(file)}
          >
            {/* Checkbox */}
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedFiles.includes(file.Id)}
                onChange={(e) => {
                  e.stopPropagation();
                  onFileSelect(file.Id);
                }}
                className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
              />
            </div>

{/* Name */}
<div className="col-span-6 flex items-center space-x-2 lg:space-x-3">
              <FileIcon
                type={file.type}
                isFolder={file.isFolder}
                folderColor={file.color}
                className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
              />
              <span className="text-xs lg:text-sm font-medium text-neutral-900 truncate">
                {file.name}
              </span>
            </div>

            {/* Size */}
<div className="col-span-2 flex items-center">
              <span className="text-xs lg:text-sm text-neutral-600">
                {file.isFolder ? "—" : formatFileSize(file.size)}
              </span>
            </div>

            {/* Modified */}
<div className="col-span-2 flex items-center">
              <span className="text-xs lg:text-sm text-neutral-600">
                {formatDate(file.modified)}
              </span>
            </div>

{/* Actions */}
            <div className="col-span-1 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div className="flex items-center space-x-1">
                {file.isFolder && (
                  <ColorPicker
                    onColorSelect={(color) => onColorChange(file.Id, color)}
                    currentColor={file.color}
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRename(file);
                  }}
                  className="p-1.5 rounded-md hover:bg-neutral-200 transition-all duration-200 hover:scale-110"
                  title="Rename"
                >
                  <ApperIcon name="Edit2" className="w-4 h-4 text-neutral-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(file.Id);
                  }}
                  className="p-1.5 rounded-md hover:bg-red-50 transition-all duration-200 hover:scale-110"
                  title="Delete"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FileList;