import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const TeamSwitchModal = ({
  isOpen,
  onClose,
  currentTeam,
  userTeams,
  availableTeams,
  onSwitchTeam,
  onJoinTeam,
  onCreateTeam
}) => {
  const [activeTab, setActiveTab] = useState("my-teams");
  
  if (!isOpen) return null;
  
  const otherTeams = availableTeams.filter(team => 
    !userTeams.some(userTeam => userTeam.Id === team.Id)
  );

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
                <ApperIcon name="ArrowLeftRight" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Switch Team</h2>
                <p className="text-sm text-neutral-500">Select a different team to work with</p>
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
            onClick={() => setActiveTab("my-teams")}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              activeTab === "my-teams"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            My Teams ({userTeams.length})
          </button>
          <button
            onClick={() => setActiveTab("available")}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors",
              activeTab === "available"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            Available Teams ({otherTeams.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === "my-teams" && (
            <div className="space-y-3">
              {userTeams.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="Users" className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-500">You're not part of any teams yet</p>
                </div>
              ) : (
                userTeams.map((team) => (
                  <div
                    key={team.Id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border transition-colors",
                      currentTeam?.Id === team.Id
                        ? "border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50"
                        : "border-neutral-200 hover:border-primary-200 hover:bg-neutral-50"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Users" className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{team.name}</div>
                        <div className="text-xs text-neutral-500">{team.description}</div>
                        <div className="text-xs text-neutral-400">
                          {team.members?.length || 0} members
                        </div>
                      </div>
                    </div>
                    
                    {currentTeam?.Id === team.Id ? (
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-4 h-4 text-primary-600" />
                        <span className="text-sm text-primary-600 font-medium">Current</span>
                      </div>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          onSwitchTeam(team.Id);
                          onClose();
                        }}
                      >
                        Switch
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
          
          {activeTab === "available" && (
            <div className="space-y-3">
              {otherTeams.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="Search" className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-500">No other teams available to join</p>
                </div>
              ) : (
                otherTeams.map((team) => (
                  <div
                    key={team.Id}
                    className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-primary-200 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Users" className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{team.name}</div>
                        <div className="text-xs text-neutral-500">{team.description}</div>
                        <div className="text-xs text-neutral-400">
                          {team.members?.length || 0} members
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onJoinTeam(team.Id)}
                    >
                      <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                      Join
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onCreateTeam();
              onClose();
            }}
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Create New Team
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamSwitchModal;