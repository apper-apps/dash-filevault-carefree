import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFileSystem } from "@/hooks/useFileSystem";
import TeamManagementModal from "@/components/organisms/TeamManagementModal";
import TeamSwitchModal from "@/components/organisms/TeamSwitchModal";
import CreateTeamModal from "@/components/organisms/CreateTeamModal";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import FileList from "@/components/organisms/FileList";
import FilePreview from "@/components/organisms/FilePreview";
import Header from "@/components/organisms/Header";
import FileGrid from "@/components/organisms/FileGrid";
import Sidebar from "@/components/organisms/Sidebar";

const FileManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [renameFile, setRenameFile] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [searchFiltersOpen, setSearchFiltersOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sizeRange, setSizeRange] = useState(null);
  
  // Team management modals
  const [teamManagementOpen, setTeamManagementOpen] = useState(false);
  const [teamSwitchOpen, setTeamSwitchOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
const {
    files,
    folderTree,
    favoritefolders,
    currentPath,
    selectedFiles,
    searchQuery,
    fileTypeFilter,
    view,
    sortBy,
    sortOrder,
    loading,
    error,
    
    // Team state
    currentUser,
    currentTeam,
userTeams,
    teamMembers,
    availableTeams,
    // Actions
    navigateToPath,
    setSearchQuery,
    setFileTypeFilter,
    setView,
    handleSort,
    createFolder,
    renameFile: renameFileAction,
    deleteFile,
    deleteSelected,
    changeFolderColor,
    toggleFileSelection,
    toggleFavorite,
    loadFiles,
    setAdvancedFilters,
    
// Team actions
    switchTeam,
    createTeam,
    joinTeam,
    leaveTeam,
    updateMemberRole,
    removeMember,
    hasPermission
  } = useFileSystem();

  const handleFileClick = (file) => {
    if (selectedFiles.includes(file.Id)) {
      toggleFileSelection(file.Id);
    } else {
      setPreviewFile(file);
      setIsPreviewOpen(true);
    }
  };

  const handleFileDoubleClick = (file) => {
    if (file.isFolder) {
      navigateToPath(file.path);
    } else {
      setPreviewFile(file);
      setIsPreviewOpen(true);
    }
  };

const handleNewFolder = () => {
    if (!hasPermission('create')) {
      toast.error("You don't have permission to create folders");
      return;
    }
    
    const name = prompt("Enter folder name:");
    if (name && name.trim()) {
      createFolder(name.trim());
    }
  };

  const handleUpload = () => {
    toast.info("Upload functionality would be implemented here");
  };

  const handleRename = (file) => {
    const newName = prompt("Enter new name:", file.name);
    if (newName && newName.trim() && newName !== file.name) {
      renameFileAction(file.Id, newName.trim());
    }
  };

const handleDelete = (fileId) => {
    if (!hasPermission('delete')) {
      toast.error("You don't have permission to delete files");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this file?")) {
      deleteFile(fileId);
    }
  };

const handleDeleteSelected = () => {
    if (!hasPermission('delete')) {
      toast.error("You don't have permission to delete files");
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected files?`)) {
      deleteSelected();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
};

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    setAdvancedFilters({ dateRange: newDateRange, sizeRange });
  };

  const handleSizeRangeChange = (newSizeRange) => {
    setSizeRange(newSizeRange);
    setAdvancedFilters({ dateRange, sizeRange: newSizeRange });
  };

  const handleClearFilters = () => {
    setDateRange({ start: '', end: '' });
    setSizeRange(null);
    setAdvancedFilters({ dateRange: { start: '', end: '' }, sizeRange: null });
  };

  const toggleSearchFilters = () => {
setSearchFiltersOpen(!searchFiltersOpen);
  };
  
  const handleCreateTeam = async (teamData) => {
    try {
      await createTeam(teamData);
      setCreateTeamOpen(false);
    } catch (err) {
      // Error handled in createTeam function
    }
  };
  
  const handleJoinTeam = async (teamId) => {
    try {
      await joinTeam(teamId);
      setTeamSwitchOpen(false);
    } catch (err) {
      // Error handled in joinTeam function
    }
  };
  
  const handleLeaveTeam = async (teamId) => {
    if (window.confirm("Are you sure you want to leave this team?")) {
      try {
        await leaveTeam(teamId);
        setTeamManagementOpen(false);
      } catch (err) {
        // Error handled in leaveTeam function
      }
    }
  };
  
  const handleUpdateMemberRole = async (userId, newRole) => {
    if (currentTeam) {
      await updateMemberRole(currentTeam.Id, userId, newRole);
    }
  };
  
  const handleRemoveMember = async (userId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      if (currentTeam) {
        await removeMember(currentTeam.Id, userId);
      }
    }
  };
if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Error message={error} onRetry={loadFiles} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
      <div className="flex">
{/* Sidebar */}
        <Sidebar
          folderTree={folderTree}
          favoritefolders={favoritefolders}
          currentPath={currentPath}
          onNavigate={navigateToPath}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          onToggleFavorite={toggleFavorite}
          onTeamSwitchOpen={() => setTeamSwitchOpen(true)}
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            currentPath={currentPath}
            onNavigate={navigateToPath}
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            view={view}
            onViewChange={setView}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSort}
            fileTypeFilter={fileTypeFilter}
            onFileTypeFilterChange={setFileTypeFilter}
            onNewFolder={handleNewFolder}
            onUpload={handleUpload}
            selectedFiles={selectedFiles}
            onDeleteSelected={handleDeleteSelected}
            onSidebarToggle={toggleSidebar}
            searchFiltersOpen={searchFiltersOpen}
            onSearchFiltersToggle={toggleSearchFilters}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
sizeRange={sizeRange}
            onSizeRangeChange={handleSizeRangeChange}
            onClearFilters={handleClearFilters}
            onTeamManagementOpen={() => setTeamManagementOpen(true)}
            onTeamSwitchOpen={() => setTeamSwitchOpen(true)}
          />
          {/* File content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {loading ? (
              <Loading type={view} />
            ) : files.length === 0 ? (
              <Empty
                title={searchQuery ? "No files found" : "This folder is empty"}
                description={searchQuery ? 
                  `No files match "${searchQuery}". Try adjusting your search.` : 
                  "Start by adding some files or folders to get organized."
                }
                action={handleNewFolder}
                actionLabel="Create Folder"
                icon={searchQuery ? "Search" : "FolderOpen"}
              />
            ) : view === "grid" ? (
<FileGrid
                files={files}
                selectedFiles={selectedFiles}
                onFileClick={handleFileClick}
                onFileDoubleClick={handleFileDoubleClick}
                onFileSelect={toggleFileSelection}
                onRename={handleRename}
                onDelete={handleDelete}
                onColorChange={changeFolderColor}
              />
) : (
<FileList
                files={files}
                selectedFiles={selectedFiles}
                onFileClick={handleFileClick}
                onFileDoubleClick={handleFileDoubleClick}
                onFileSelect={toggleFileSelection}
                onRename={handleRename}
                onDelete={handleDelete}
                onColorChange={changeFolderColor}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSort}
              />
            )}
          </main>
        </div>
      </div>

      {/* File Preview Modal */}
      <FilePreview
        file={previewFile}
isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      
      {/* Team Management Modal */}
      {teamManagementOpen && (
        <TeamManagementModal
          isOpen={teamManagementOpen}
          onClose={() => setTeamManagementOpen(false)}
          currentTeam={currentTeam}
          currentUser={currentUser}
          teamMembers={teamMembers}
          onUpdateMemberRole={handleUpdateMemberRole}
          onRemoveMember={handleRemoveMember}
          onLeaveTeam={() => handleLeaveTeam(currentTeam?.Id)}
          onCreateTeam={() => {
            setTeamManagementOpen(false);
            setCreateTeamOpen(true);
          }}
        />
      )}
      
      {/* Team Switch Modal */}
      {teamSwitchOpen && (
        <TeamSwitchModal
          isOpen={teamSwitchOpen}
          onClose={() => setTeamSwitchOpen(false)}
          currentTeam={currentTeam}
          userTeams={userTeams}
          availableTeams={availableTeams}
          onSwitchTeam={switchTeam}
          onJoinTeam={handleJoinTeam}
          onCreateTeam={() => {
            setTeamSwitchOpen(false);
            setCreateTeamOpen(true);
          }}
        />
      )}
      
      {/* Create Team Modal */}
      {createTeamOpen && (
        <CreateTeamModal
          isOpen={createTeamOpen}
          onClose={() => setCreateTeamOpen(false)}
          onCreateTeam={handleCreateTeam}
        />
      )}
    </div>
  );
};

export default FileManager;