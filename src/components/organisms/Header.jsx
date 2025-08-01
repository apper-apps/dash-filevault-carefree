import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import SortSelect from "@/components/molecules/SortSelect";
import FileTypeFilter from "@/components/molecules/FileTypeFilter";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import ViewToggle from "@/components/molecules/ViewToggle";
import SearchFilters from "@/components/molecules/SearchFilters";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
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
  onSidebarToggle,
  searchFiltersOpen,
  onSearchFiltersToggle,
  dateRange,
  onDateRangeChange,
  sizeRange,
  onSizeRangeChange,
  onClearFilters,
  onTeamManagementOpen,
  onTeamSwitchOpen,
}) => {
const [searchExpanded, setSearchExpanded] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

return (
    <header
    className="bg-gradient-to-r from-white via-primary-50 to-accent-50 border-b border-primary-200 sticky top-0 z-30 shadow-smooth">
    <div className="px-4 sm:px-6 lg:px-8">
        {/* Mobile: Single compact row with all controls */}
        <div className="lg:hidden">
            <div className="flex items-center justify-between h-12 py-2">
                {/* Left side - Mobile menu + Search */}
                <div className="flex items-center space-x-2 flex-1">
                    <button
                        onClick={onSidebarToggle}
                        className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                        <ApperIcon name="Menu" className="w-5 h-5" />
                    </button>
                    <div
                        className={`flex-1 mr-2 transition-all duration-300 ease-out ${searchExpanded ? "max-w-lg" : "max-w-xs"}`}>
                        <SearchBar
                            value={searchQuery}
                            onChange={onSearchChange}
                            placeholder="Search files..."
                            expanded={searchExpanded}
                            onExpandedChange={setSearchExpanded} />
                    </div>
                </div>
                {/* Right side - Actions and Profile */}
                <div className="flex items-center space-x-2">
                    <ViewToggle view={view} onViewChange={onViewChange} />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onUpload}
                        className="hover:shadow-lg transition-all duration-200">
                        <ApperIcon name="Upload" className="w-4 h-4" />
                    </Button>
                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            className="flex items-center space-x-1 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                            <div
                                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">JD</span>
                            </div>
                            <ApperIcon name="ChevronDown" className="w-4 h-4 text-neutral-500" />
                        </button>
                        {/* Profile Dropdown Menu */}
                        {profileDropdownOpen && <div
                            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                            <div className="px-4 py-2 border-b border-neutral-100">
                                <div className="text-sm font-medium text-neutral-900">John Doe</div>
                                <div className="text-xs text-neutral-500">john.doe@company.com</div>
                            </div>
                            <div className="py-2">
                                <button
                                    onClick={() => {
                                        setProfileDropdownOpen(false);
                                        onTeamManagementOpen();
                                    }}
                                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                                    <ApperIcon name="Users" className="w-4 h-4" />
                                    <span>Team Management</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setProfileDropdownOpen(false);
                                        onTeamSwitchOpen();
                                    }}
                                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                                    <ApperIcon name="ArrowLeftRight" className="w-4 h-4" />
                                    <span>Switch Team</span>
                                </button>
                                <div className="border-t border-neutral-100 my-2"></div>
                                <button
                                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                                    <ApperIcon name="Settings" className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                                <button
                                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                    <ApperIcon name="LogOut" className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            {/* Mobile breadcrumb */}
            <div className="pb-3">
                <Breadcrumb path={currentPath} onNavigate={onNavigate} />
            </div>
        </div>
        {/* Desktop: Dual-row layout (preserved) */}
        <div className="hidden lg:block">
            {/* First Row - Navigation */}
            <div className="flex items-center justify-between h-10 py-2">
                {/* Left side - Breadcrumb */}
                <div className="flex items-center space-x-4 flex-1">
                    <div>
                        <Breadcrumb path={currentPath} onNavigate={onNavigate} />
                    </div>
                </div>
                {/* Right side - User Profile */}
                <div className="relative">
                    <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                        <div
                            className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">JD</span>
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-medium text-neutral-900">John Doe</div>
                            <div className="text-xs text-neutral-500">Admin • Design Team</div>
                        </div>
                        <ApperIcon name="ChevronDown" className="w-4 h-4 text-neutral-500" />
                    </button>
                    {/* Profile Dropdown Menu */}
                    {profileDropdownOpen && <div
                        className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-neutral-100">
                            <div className="text-sm font-medium text-neutral-900">John Doe</div>
                            <div className="text-xs text-neutral-500">john.doe@company.com</div>
                        </div>
                        <div className="py-2">
                            <button
                                onClick={() => {
                                    setProfileDropdownOpen(false);
                                    onTeamManagementOpen();
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                                <ApperIcon name="Users" className="w-4 h-4" />
                                <span>Team Management</span>
                            </button>
                            <button
                                onClick={() => {
                                    setProfileDropdownOpen(false);
                                    onTeamSwitchOpen();
                                }}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                                <ApperIcon name="ArrowLeftRight" className="w-4 h-4" />
                                <span>Switch Team</span>
                            </button>
                            <div className="border-t border-neutral-100 my-2"></div>
                            <button
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                                <ApperIcon name="Settings" className="w-4 h-4" />
                                <span>Settings</span>
                            </button>
                            <button
                                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                <ApperIcon name="LogOut" className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
            {/* Second Row - Search and Actions */}
            <div className="flex items-center justify-between h-10 py-2">
                {/* Left side - Search */}
                <div
                    className={`flex-1 mr-4 transition-all duration-300 ease-out ${searchExpanded ? "max-w-lg sm:max-w-xl md:max-w-2xl" : "max-w-md"}`}>
                    <SearchBar
                        value={searchQuery}
                        onChange={onSearchChange}
                        placeholder="Search files and folders..."
                        expanded={searchExpanded}
                        onExpandedChange={setSearchExpanded} />
                </div>
                {/* Right side - Filters and Actions */}
                <div className="flex items-center space-x-3">
                    <div>
                        <SortSelect sortBy={sortBy} sortOrder={sortOrder} onSortChange={onSortChange} />
                    </div>
                    <div>
                        <FileTypeFilter fileTypeFilter={fileTypeFilter} onFilterChange={onFileTypeFilterChange} />
                    </div>
                    <ViewToggle view={view} onViewChange={onViewChange} />
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onNewFolder}
                            className="hover:shadow-lg transition-all duration-200">
                            <ApperIcon name="FolderPlus" className="w-4 h-4 mr-2" />
                            <span>New Folder</span>
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onUpload}
                            className="hover:shadow-lg transition-all duration-200">
                            <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
                            <span>Upload</span>
                        </Button>
                    </div>
                </div>
            </div>
            {/* Selection bar */}
            {selectedFiles.length > 0 && <div
                className="bg-gradient-to-r from-primary-100 to-accent-100 border-t border-primary-300 px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-primary-700">
                    {selectedFiles.length}item{selectedFiles.length > 1 ? "s" : ""}selected
                                                </span>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onDeleteSelected}
                        className="text-red-600 hover:text-red-700">
                        <ApperIcon name="Trash2" className="w-4 h-4 mr-1" />Delete
                                                          </Button>
                </div>
            </div>}
            {/* Search Filters Panel */}
            <SearchFilters
                isOpen={searchFiltersOpen}
                onToggle={onSearchFiltersToggle}
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
                sizeRange={sizeRange}
                onSizeRangeChange={onSizeRangeChange}
                onClearFilters={onClearFilters} />
        </div>
    </div></header>
  );
};

export default Header;