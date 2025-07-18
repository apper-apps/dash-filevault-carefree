import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import FileIcon from "@/components/molecules/FileIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ 
  folderTree, 
  favoritefolders,
  currentPath, 
  onNavigate, 
  isOpen, 
  onToggle,
  onToggleFavorite,
  onTeamSwitchOpen
}) => {
const FolderTreeItem = ({ folder, level = 0, onToggleFavorite }) => {
    const hasChildren = folder.children && folder.children.length > 0;
    const isActive = currentPath === folder.path;
    const isExpanded = folder.expanded;

    return (
      <div>
        <div className="flex items-center group">
          <button
            onClick={() => onNavigate(folder.path)}
            className={cn(
              "flex-1 flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors",
isActive 
                ? "bg-gradient-to-r from-primary-200 to-accent-200 text-primary-800"
                : "text-neutral-700 hover:bg-neutral-100",
              level > 0 && "ml-4"
            )}
          >
            {hasChildren && (
              <ApperIcon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                className="w-4 h-4 flex-shrink-0" 
              />
            )}
            <FileIcon 
              type="folder" 
              isFolder={true} 
              folderColor={folder.color}
              className="w-4 h-4 flex-shrink-0" 
            />
            <span className="truncate">{folder.name}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(folder.Id);
            }}
            className="p-1 rounded hover:bg-neutral-100 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ApperIcon 
              name={folder.isFavorite ? "Star" : "Star"} 
              className={cn(
                "w-4 h-4 transition-colors",
                folder.isFavorite 
                  ? "text-yellow-500 fill-current" 
                  : "text-neutral-400 hover:text-yellow-500"
              )}
            />
          </button>
        </div>
        
{hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="ml-4 mt-1 space-y-1"
          >
            {folder.children.map((child, index) => (
              <motion.div
                key={child.Id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FolderTreeItem 
                  folder={child} 
                  level={level + 1}
                  onToggleFavorite={onToggleFavorite}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  // Desktop sidebar
const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-gradient-to-b from-white via-primary-50 to-accent-50 border-r border-primary-200 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="HardDrive" className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">FileVault</h2>
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <button
              onClick={() => onNavigate("/")}
              className={cn(
                "w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors",
currentPath === "/" 
                  ? "bg-gradient-to-r from-primary-200 to-accent-200 text-primary-800"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <ApperIcon name="Home" className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>

{favoritefolders.length > 0 && (
            <div className="space-y-1 mb-4">
              <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Favorites
              </div>
              {favoritefolders.map(folder => (
                <FolderTreeItem 
                  key={folder.Id} 
                  folder={folder} 
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
)}
            
            {/* Team Section */}
            <div className="space-y-1 mb-4">
              <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Team
              </div>
              <div className="px-3 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="Users" className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-800">Design Team</div>
                    <div className="text-xs text-primary-600">5 members</div>
                  </div>
                </div>
              </div>
<button 
                onClick={onTeamSwitchOpen}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Switch Team</span>
              </button>
            </div>

          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
              Folders
            </div>
            {folderTree.map(folder => (
              <FolderTreeItem 
                key={folder.Id} 
                folder={folder} 
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );

  // Mobile sidebar
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
{/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="HardDrive" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-neutral-900">FileVault</h2>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            <div className="mb-4">
              <button
                onClick={() => {
                  onNavigate("/");
                  onToggle();
                }}
                className={cn(
                  "w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors",
currentPath === "/" 
                    ? "bg-gradient-to-r from-primary-200 to-accent-200 text-primary-800"
                    : "text-neutral-700 hover:bg-neutral-100"
                )}
              >
                <ApperIcon name="Home" className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>

{favoritefolders.length > 0 && (
              <div className="space-y-1 mb-4">
                <div className="px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                  Favorites
                </div>
                {favoritefolders.map(folder => (
                  <FolderTreeItem 
                    key={folder.Id} 
                    folder={folder} 
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
)}
{/* Team Section */}
            <div className="space-y-1 mb-3">
              <div className="px-3 py-1 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Team
              </div>
              <div className="px-3 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="Users" className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary-800">Design Team</div>
                    <div className="text-xs text-primary-600">5 members</div>
                  </div>
                </div>
              </div>
              <button 
                onClick={onTeamSwitchOpen}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Switch Team</span>
              </button>
            </div>

<div className="space-y-1">
              <div className="px-3 py-1 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                Folders
              </div>
              {folderTree.map(folder => (
                <FolderTreeItem 
                  key={folder.Id} 
                  folder={folder} 
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;