import React from "react";
import { motion } from "framer-motion";
import FileIcon from "@/components/molecules/FileIcon";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import ColorPicker from "@/components/molecules/ColorPicker";
import { cn } from "@/utils/cn";
import { formatFileSize, formatDate } from "@/utils/formatters";

const FileGrid = ({ 
  files, 
  selectedFiles, 
  onFileClick, 
  onFileDoubleClick,
  onFileSelect,
  onRename,
  onDelete,
  onColorChange,
  onMove
}) => {
  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case "pdf": return "pdf";
      case "image": return "image";
      case "video": return "video";
      case "document": return "document";
      case "spreadsheet": return "document";
      case "presentation": return "document";
      case "archive": return "archive";
      case "folder": return "folder";
      default: return "default";
    }
  };

  const handleContextMenu = (e, file) => {
    e.preventDefault();
    // Context menu functionality would go here
  };

return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {files.map((file, index) => (
        <motion.div
          key={file.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "card card-hover p-6 cursor-pointer group relative overflow-hidden",
            selectedFiles.includes(file.Id) && "ring-2 ring-primary-500 bg-primary-50 shadow-lg"
          )}
          onClick={() => onFileClick(file)}
          onDoubleClick={() => onFileDoubleClick(file)}
          onContextMenu={(e) => handleContextMenu(e, file)}
        >
          {/* Selection checkbox */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

{/* File icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <FileIcon
                type={file.type}
                isFolder={file.isFolder}
                folderColor={file.color}
                className="w-8 h-8"
              />
            </div>
          </div>

          {/* File info */}
          <div className="text-center space-y-2">
            <h3 className="font-medium text-sm text-neutral-900 truncate" title={file.name}>
              {file.name}
            </h3>
            
            <div className="flex justify-center">
              <Badge variant={getTypeBadgeVariant(file.type)}>
                {file.isFolder ? "Folder" : file.type.toUpperCase()}
              </Badge>
            </div>
            
            <div className="text-xs text-neutral-500 space-y-1">
              {!file.isFolder && (
                <div>{formatFileSize(file.size)}</div>
              )}
              <div>{formatDate(file.modified)}</div>
            </div>
          </div>

{/* Hover actions */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center space-x-3">
              {file.isFolder && (
                <div className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                  <ColorPicker
                    onColorSelect={(color) => onColorChange(file.Id, color)}
                    currentColor={file.color}
                  />
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRename(file);
                }}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                title="Rename"
              >
                <ApperIcon name="Edit2" className="w-4 h-4 text-neutral-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(file.Id);
                }}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 hover:bg-red-50"
                title="Delete"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FileGrid;