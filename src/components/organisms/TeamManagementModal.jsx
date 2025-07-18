import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatters";

const TeamManagementModal = ({
  isOpen,
  onClose,
  currentTeam,
  currentUser,
  teamMembers,
  onUpdateMemberRole,
  onRemoveMember,
  onLeaveTeam,
  onCreateTeam
}) => {
  const [activeTab, setActiveTab] = useState("members");
  
  if (!isOpen || !currentTeam) return null;
  
  const isOwner = currentUser?.Id === currentTeam.ownerId;
  const isAdmin = teamMembers.find(m => m.Id === currentUser?.Id)?.role === "Admin";
  const canManageMembers = isOwner || isAdmin;
  
  const roleOptions = ["Owner", "Admin", "Member", "Viewer"];
  const roleColors = {
    Owner: "bg-purple-100 text-purple-800",
    Admin: "bg-blue-100 text-blue-800", 
    Member: "bg-green-100 text-green-800",
    Viewer: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Users" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">{currentTeam.name}</h2>
                <p className="text-sm text-neutral-500">{currentTeam.description}</p>
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

        {/* Tabs */}
        <div className="flex border-b border-neutral-200">
          <button
            onClick={() => setActiveTab("members")}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              activeTab === "members"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Members ({teamMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              activeTab === "settings"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === "members" && (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.Id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {member.name?.charAt(0) || member.email?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{member.name}</div>
                      <div className="text-xs text-neutral-500">{member.email}</div>
                      <div className="text-xs text-neutral-400">
                        Joined {formatDate(member.joinedAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={cn("px-2 py-1 text-xs rounded-full", roleColors[member.role])}>
                      {member.role}
                    </span>
                    
                    {canManageMembers && member.Id !== currentUser?.Id && (
                      <div className="flex items-center space-x-2">
                        <select
                          value={member.role}
                          onChange={(e) => onUpdateMemberRole(member.Id, e.target.value)}
                          className="text-xs border border-neutral-300 rounded px-2 py-1"
                        >
                          {roleOptions.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                        
                        <button
                          onClick={() => onRemoveMember(member.Id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Team Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Allow Guest Access</div>
                      <div className="text-xs text-neutral-500">Allow non-members to view shared files</div>
                    </div>
                    <div className="text-sm text-neutral-600">
                      {currentTeam.settings?.allowGuestAccess ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Default File Permissions</div>
                      <div className="text-xs text-neutral-500">Default sharing level for new files</div>
                    </div>
                    <div className="text-sm text-neutral-600 capitalize">
                      {currentTeam.settings?.defaultFilePermissions || "Team"}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Storage Limit</div>
                      <div className="text-xs text-neutral-500">Maximum storage for this team</div>
                    </div>
                    <div className="text-sm text-neutral-600">
                      {Math.round((currentTeam.settings?.storageLimit || 0) / (1024 * 1024 * 1024))} GB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onCreateTeam}
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isOwner && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onLeaveTeam}
                className="text-red-600 hover:text-red-700"
              >
                <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                Leave Team
              </Button>
            )}
            
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamManagementModal;