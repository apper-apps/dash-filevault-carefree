import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

const CreateTeamModal = ({
  isOpen,
  onClose,
  onCreateTeam
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    allowGuestAccess: false,
    defaultFilePermissions: "team",
    storageLimit: 10737418240 // 10GB default
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  if (!isOpen) return null;
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Team name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Team description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onCreateTeam(formData);
      onClose();
      setFormData({
        name: "",
        description: "",
        allowGuestAccess: false,
        defaultFilePermissions: "team",
        storageLimit: 10737418240
      });
    } catch (err) {
      // Error handled in parent component
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Plus" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Create Team</h2>
                <p className="text-sm text-neutral-500">Set up a new team workspace</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Team Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter team name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your team's purpose"
              rows={3}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.description ? "border-red-500" : "border-neutral-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Default File Permissions
            </label>
            <select
              value={formData.defaultFilePermissions}
              onChange={(e) => handleChange("defaultFilePermissions", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="private">Private</option>
              <option value="team">Team</option>
              <option value="public">Public</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Storage Limit (GB)
            </label>
            <select
              value={formData.storageLimit}
              onChange={(e) => handleChange("storageLimit", parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={5368709120}>5 GB</option>
              <option value={10737418240}>10 GB</option>
              <option value={21474836480}>20 GB</option>
              <option value={53687091200}>50 GB</option>
              <option value={107374182400}>100 GB</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowGuestAccess"
              checked={formData.allowGuestAccess}
              onChange={(e) => handleChange("allowGuestAccess", e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label htmlFor="allowGuestAccess" className="ml-2 block text-sm text-neutral-700">
              Allow guest access to shared files
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-end space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Create Team
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateTeamModal;