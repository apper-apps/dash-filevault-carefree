import { useState, useEffect } from "react";
import { fileService } from "@/services/api/fileService";
import { toast } from "react-toastify";

export const useFileSystem = () => {
  const [files, setFiles] = useState([]);
  const [folderTree, setFolderTree] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load files for current path
  const loadFiles = async (path = currentPath) => {
    setLoading(true);
    setError(null);
    
    try {
      const allFiles = await fileService.getAll();
      
      // Filter files for current path
      let filteredFiles;
      if (path === "/") {
        filteredFiles = allFiles.filter(f => f.parentId === null);
      } else {
        const parent = allFiles.find(f => f.path === path);
        if (parent) {
          filteredFiles = allFiles.filter(f => f.parentId === parent.Id);
        } else {
          filteredFiles = [];
        }
      }
// Apply search filter
      if (searchQuery) {
        filteredFiles = filteredFiles.filter(f =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply file type filter
      if (fileTypeFilter !== "all") {
        filteredFiles = filteredFiles.filter(f => {
          if (f.isFolder) return true; // Always show folders
          return getFileTypeCategory(f.type || f.name) === fileTypeFilter;
        });
      }
      // Sort files
      filteredFiles.sort((a, b) => {
        // Folders first
        if (a.isFolder && !b.isFolder) return -1;
        if (!a.isFolder && b.isFolder) return 1;
        
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        
        if (sortBy === "name") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
      
      setFiles(filteredFiles);
    } catch (err) {
      setError("Failed to load files");
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  // Build folder tree
  const buildFolderTree = async () => {
    try {
      const allFiles = await fileService.getAll();
      const folders = allFiles.filter(f => f.isFolder);
      
      const buildTree = (parentId = null) => {
        return folders
          .filter(f => f.parentId === parentId)
          .map(folder => ({
            ...folder,
            children: buildTree(folder.Id),
            expanded: true
          }));
      };
      
      setFolderTree(buildTree());
    } catch (err) {
      console.error("Failed to build folder tree:", err);
    }
};

  // Helper function to categorize file types
  const getFileTypeCategory = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico', 'tiff'];
    const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'ppt', 'pptx', 'csv'];
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp'];
    const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'];
    const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'];
    
    if (imageExtensions.includes(extension)) return 'images';
    if (documentExtensions.includes(extension)) return 'documents';
    if (videoExtensions.includes(extension)) return 'videos';
    if (audioExtensions.includes(extension)) return 'audio';
    if (archiveExtensions.includes(extension)) return 'archives';
    return 'other';
  };

// Navigate to path
  const navigateToPath = (path) => {
    setCurrentPath(path);
    setSelectedFiles([]);
    setSearchQuery("");
    setFileTypeFilter("all");
  };

  // File operations
  const createFolder = async (name) => {
    try {
      const currentParent = currentPath === "/" ? null : files.find(f => f.path === currentPath)?.Id;
      
      await fileService.create({
        name,
        type: "folder",
        isFolder: true,
        parentId: currentParent,
        path: currentPath === "/" ? `/${name}` : `${currentPath}/${name}`,
        size: 0
      });
      
      toast.success("Folder created successfully");
      loadFiles();
      buildFolderTree();
    } catch (err) {
      toast.error("Failed to create folder");
    }
  };

  const renameFile = async (fileId, newName) => {
    try {
      await fileService.update(fileId, { name: newName });
      toast.success("File renamed successfully");
      loadFiles();
      buildFolderTree();
    } catch (err) {
      toast.error("Failed to rename file");
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await fileService.delete(fileId);
      toast.success("File deleted successfully");
      loadFiles();
      buildFolderTree();
    } catch (err) {
      toast.error("Failed to delete file");
    }
};

  const changeFolderColor = async (fileId, color) => {
    try {
      await fileService.updateColor(fileId, color);
      toast.success("Folder color updated successfully");
      loadFiles();
      buildFolderTree();
    } catch (err) {
      toast.error("Failed to update folder color");
    }
  };

  const deleteSelected = async () => {
    try {
      await Promise.all(selectedFiles.map(id => fileService.delete(id)));
      toast.success(`${selectedFiles.length} files deleted successfully`);
      setSelectedFiles([]);
      loadFiles();
      buildFolderTree();
    } catch (err) {
      toast.error("Failed to delete selected files");
    }
  };

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  // Effects
  useEffect(() => {
    loadFiles();
    buildFolderTree();
  }, []);

useEffect(() => {
    loadFiles();
  }, [currentPath, searchQuery, fileTypeFilter, sortBy, sortOrder]);

return {
    // State
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
    
    // Actions
    navigateToPath,
    setSearchQuery,
    setFileTypeFilter,
    setView,
handleSort,
    createFolder,
    renameFile,
    deleteFile,
    deleteSelected,
    changeFolderColor,
    toggleFileSelection,
    loadFiles
  };
};