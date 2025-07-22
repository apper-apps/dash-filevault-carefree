import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const RenameModal = ({
  isOpen,
  onClose,
  onRename,
  currentName,
  fileType = 'file'
}) => {
  const [newName, setNewName] = useState(currentName || '');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewName(currentName || '');
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, currentName]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!newName.trim()) {
      newErrors.name = 'Name is required';
    } else if (newName.trim() === currentName) {
      newErrors.name = 'New name must be different from current name';
    } else if (newName.trim().length > 255) {
      newErrors.name = 'Name must be less than 255 characters';
    } else if (!/^[^<>:"/\\|?*]+$/.test(newName.trim())) {
      newErrors.name = 'Name contains invalid characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onRename(newName.trim());
    } catch (error) {
      setErrors({ submit: 'Failed to rename. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name={fileType === 'folder' ? "Folder" : "FileText"} className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Rename {fileType}
              </h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {fileType === 'folder' ? 'Folder name' : 'File name'}
            </label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={`Enter ${fileType} name`}
              disabled={isSubmitting}
              className={cn(
                errors.name && "border-red-300 focus:border-red-500 focus:ring-red-500"
              )}
              autoFocus
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {errors.submit && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[80px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Renaming...</span>
                </div>
              ) : (
                'Rename'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RenameModal;