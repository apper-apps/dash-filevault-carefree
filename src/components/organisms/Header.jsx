import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import ViewToggle from "@/components/molecules/ViewToggle";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import SortSelect from "@/components/molecules/SortSelect";
import FileTypeFilter from "@/components/molecules/FileTypeFilter";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
const Header = ({ 
  currentPath,
  onNavigate,
  searchQuery,
  onSearchChange,
  view,
  onViewChange,
  sortBy,
  sortOrder,
  onSortChange,
  fileTypeFilter,
  onFileTypeFilterChange,
  onNewFolder,
  onUpload,
  selectedFiles,
  onDeleteSelected,
  onSidebarToggle
}) => {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu + Breadcrumb */}
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={onSidebarToggle}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors lg:hidden"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:block">
              <Breadcrumb path={currentPath} onNavigate={onNavigate} />
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search files and folders..."
            />
          </div>

{/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <SortSelect
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
              />
            </div>
            
            <div className="hidden md:block">
              <FileTypeFilter
                fileTypeFilter={fileTypeFilter}
                onFilterChange={onFileTypeFilterChange}
              />
            </div>
            
            <ViewToggle view={view} onViewChange={onViewChange} />
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onNewFolder}
                className="hidden sm:inline-flex"
              >
                <ApperIcon name="FolderPlus" className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">New Folder</span>
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={onUpload}
              >
                <ApperIcon name="Upload" className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile breadcrumb */}
        <div className="sm:hidden pb-4">
          <Breadcrumb path={currentPath} onNavigate={onNavigate} />
        </div>

        {/* Selection bar */}
        {selectedFiles.length > 0 && (
          <div className="bg-primary-50 border-t border-primary-200 px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-primary-700">
              {selectedFiles.length} item{selectedFiles.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onDeleteSelected}
                className="text-red-600 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;