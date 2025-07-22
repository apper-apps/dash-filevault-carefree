import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

const MoveFolderModal = ({ isOpen, onClose, onMove, file, availableFolders }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  const handleMove = async () => {
    if (!selectedFolder) return;
    
    setIsMoving(true);
    try {
      await onMove(file, selectedFolder);
      onClose();
    } catch (error) {
      // Error handled by parent component
    } finally {
      setIsMoving(false);
    }
  };

  const handleClose = () => {
    if (!isMoving) {
      setSelectedFolder(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-lg shadow-xl border border-neutral-200 w-full max-w-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Move" className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Move Item</h3>
                <p className="text-sm text-neutral-600">Choose destination folder</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isMoving}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* File info */}
            <div className="mb-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                  <ApperIcon 
                    name={file?.isFolder ? "Folder" : "File"} 
                    className="w-4 h-4 text-primary-600" 
                  />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{file?.name}</p>
                  <p className="text-sm text-neutral-600">
                    {file?.isFolder ? "Folder" : "File"}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination folders */}
            <div className="space-y-2">
              <p className="font-medium text-neutral-900 mb-3">Select destination:</p>
              
              <div className="max-h-64 overflow-y-auto space-y-1 border border-neutral-200 rounded-lg p-2">
                {availableFolders.map((folder) => (
                  <button
                    key={folder.Id || 'root'}
                    onClick={() => setSelectedFolder(folder)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-all duration-200 hover:bg-primary-50",
                      selectedFolder?.Id === folder.Id
                        ? "border-primary-300 bg-primary-50 shadow-sm"
                        : "border-neutral-200 hover:border-primary-200"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                        <ApperIcon 
                          name={folder.Id ? "Folder" : "Home"} 
                          className="w-4 h-4 text-primary-600" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">
                          {folder.name}
                        </p>
                        <p className="text-sm text-neutral-600 truncate">
                          {folder.path}
                        </p>
                      </div>
                      {selectedFolder?.Id === folder.Id && (
                        <ApperIcon name="Check" className="w-4 h-4 text-primary-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-neutral-200">
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={isMoving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleMove}
              disabled={!selectedFolder || isMoving}
              className="min-w-[100px]"
            >
              {isMoving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Moving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Move" className="w-4 h-4" />
                  <span>Move Here</span>
                </div>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MoveFolderModal;