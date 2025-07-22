import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger"
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return "AlertTriangle";
      case 'warning':
        return "AlertCircle";
      case 'info':
        return "Info";
      default:
        return "AlertTriangle";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return "from-red-500 to-red-600";
      case 'warning':
        return "from-yellow-500 to-yellow-600";
      case 'info':
        return "from-blue-500 to-blue-600";
      default:
        return "from-red-500 to-red-600";
    }
  };

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
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${getIconColor()} rounded-lg flex items-center justify-center`}>
              <ApperIcon name={getIcon()} className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-neutral-700 mb-6">{message}</p>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === 'danger' ? 'primary' : 'primary'}
              onClick={handleConfirm}
              className={variant === 'danger' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : ''}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;