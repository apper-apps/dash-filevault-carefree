import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FileIcon from "@/components/molecules/FileIcon";
import { formatFileSize, formatDate } from "@/utils/formatters";

const FilePreview = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null;

  const canPreview = file.type === "image" || file.type === "text";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-white via-primary-50 to-accent-50 rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-200">
          <div className="flex items-center space-x-3">
            <FileIcon
              type={file.type}
              isFolder={file.isFolder}
              className="w-6 h-6"
            />
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{file.name}</h3>
              <p className="text-sm text-neutral-600">{file.path}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {canPreview ? (
            <div className="mb-6">
{file.type === "image" ? (
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg p-4 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Image" className="w-16 h-16 text-neutral-500" />
                  </div>
                </div>
) : (
                <div className="bg-gradient-to-br from-secondary-100 to-accent-100 rounded-lg p-4 min-h-[200px] font-mono text-sm">
                  <p className="text-neutral-600">File content preview would appear here...</p>
                </div>
              )}
            </div>
) : (
            <div className="bg-gradient-to-br from-accent-100 to-secondary-100 rounded-lg p-8 text-center mb-6">
              <FileIcon
                type={file.type}
                isFolder={file.isFolder}
                className="w-16 h-16 mx-auto mb-4 text-neutral-400"
              />
              <p className="text-neutral-600">Preview not available for this file type</p>
            </div>
          )}

          {/* File details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-neutral-900">Size</dt>
              <dd className="text-neutral-600">{formatFileSize(file.size)}</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Type</dt>
              <dd className="text-neutral-600">{file.type.toUpperCase()}</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Modified</dt>
              <dd className="text-neutral-600">{formatDate(file.modified)}</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Created</dt>
              <dd className="text-neutral-600">{formatDate(file.created)}</dd>
            </div>
          </div>
        </div>

{/* Actions */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-4 flex items-center justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FilePreview;