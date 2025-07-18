import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFileSystem } from "@/hooks/useFileSystem";
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

const {
    files,
    folderTree,
    currentPath,
    selectedFiles,
    searchQuery,
    fileTypeFilter,
    view,
    sortBy,
    sortOrder,
    loading,
    error,
    navigateToPath,
    setSearchQuery,
    setFileTypeFilter,
    setView,
    handleSort,
    createFolder,
    renameFile: renameFileAction,
    deleteFile,
    deleteSelected,
    toggleFileSelection,
    loadFiles
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
    if (window.confirm("Are you sure you want to delete this file?")) {
      deleteFile(fileId);
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected files?`)) {
      deleteSelected();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Error message={error} onRetry={loadFiles} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          folderTree={folderTree}
          currentPath={currentPath}
          onNavigate={navigateToPath}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
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
    </div>
  );
};

export default FileManager;