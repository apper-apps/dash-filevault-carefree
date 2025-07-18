import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fileService } from "@/services/api/fileService";
import { teamService } from "@/services/api/teamService";
import { userService } from "@/services/api/userService";
export const useFileSystem = () => {
  const [files, setFiles] = useState([]);
  const [folderTree, setFolderTree] = useState([]);
  const [favoritefolders, setFavoritefolders] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: { start: '', end: '' },
    sizeRange: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
// Team-related state
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [userTeams, setUserTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [availableTeams, setAvailableTeams] = useState([]);
  
  // Load team data
  const loadTeamData = async () => {
    try {
      // Mock current user (in real app, this would come from authentication)
      const mockCurrentUser = { Id: 1, name: "John Doe", email: "john.doe@company.com", role: "Admin" };
      setCurrentUser(mockCurrentUser);
      
      // Load user's teams
      const teams = await teamService.getUserTeams(mockCurrentUser.Id);
      setUserTeams(teams);
      
      // Set current team (first team by default)
      if (teams.length > 0) {
        setCurrentTeam(teams[0]);
        
        // Load team members
        const members = await Promise.all(
          teams[0].members.map(async (member) => {
            const user = await userService.getById(member.Id);
            return {
              ...user,
              role: member.role,
              joinedAt: member.joinedAt
            };
          })
        );
        setTeamMembers(members);
      }
      
      // Load all available teams
      const allTeams = await teamService.getAll();
      setAvailableTeams(allTeams);
    } catch (err) {
      console.error("Failed to load team data:", err);
    }
  };
  // Load files function
  const loadFiles = async () => {
    await getFilesByPath(currentPath);
  };

// Helper function to get files by path
  const getFilesByPath = async (path) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 150));
      
      let filteredFiles;
      // Handle search with advanced filters
      if (searchQuery || advancedFilters.dateRange.start || advancedFilters.dateRange.end || advancedFilters.sizeRange) {
        filteredFiles = await fileService.search(searchQuery, advancedFilters);
        
        // For search results, we might want to show files from all paths
        // but if we're in a specific folder, filter by path as well
        if (!searchQuery && (advancedFilters.dateRange.start || advancedFilters.dateRange.end || advancedFilters.sizeRange)) {
          filteredFiles = filteredFiles.filter(file => {
            const filePath = file.path.split('/').slice(0, -1).join('/') || '/';
            return filePath === path;
          });
        }
      } else {
        // Get all files and filter by current path
        const allFiles = await fileService.getAll();
        filteredFiles = allFiles.filter(file => {
          const filePath = file.path.split('/').slice(0, -1).join('/') || '/';
          return filePath === path;
        });
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
      console.error("Failed to load files:", err);
      setError("Unable to load files. Please check your connection and try again.");
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
      
      // Update favorites
      const favorites = folders.filter(f => f.isFavorite);
      setFavoritefolders(favorites);
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

  const toggleFavorite = async (folderId) => {
    try {
      await fileService.toggleFavorite(folderId);
      toast.success("Favorite updated successfully");
      loadFiles();
      buildFolderTree();
    } catch (err) {
      toast.error("Failed to update favorite");
}
  };

  const uploadFiles = async (fileList) => {
    if (!hasPermission('create')) {
      toast.error("You don't have permission to upload files");
      return;
    }

    const files = Array.from(fileList);
    const maxFileSize = 100 * 1024 * 1024; // 100MB limit
    const maxFiles = 10;

    // Validate file count
    if (files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed at once`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter(file => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      toast.error(`Some files exceed the 100MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    try {
      setLoading(true);
      const uploadPromises = files.map(async (file) => {
        const fileData = {
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          isFolder: false,
          parentId: currentPath === "/" ? null : files.find(f => f.path === currentPath)?.Id,
          path: currentPath === "/" ? `/${file.name}` : `${currentPath}/${file.name}`,
          content: file // In real implementation, this would be uploaded to server
        };

        return await fileService.upload(fileData);
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      
      toast.success(`Successfully uploaded ${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''}`);
      loadFiles();
      buildFolderTree();
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setLoading(false);
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

  // Load files when path, search, or filters change
  useEffect(() => {
    getFilesByPath(currentPath);
  }, [currentPath, searchQuery, fileTypeFilter, advancedFilters]);

  // Build folder tree
  useEffect(() => {
    buildFolderTree();
  }, []);

// Effects
  useEffect(() => {
    loadFiles();
    buildFolderTree();
    loadTeamData();
  }, []);

  useEffect(() => {
    loadFiles();
  }, [currentPath, searchQuery, fileTypeFilter, sortBy, sortOrder]);

// Team operations
  const switchTeam = async (teamId) => {
    try {
      const team = await teamService.getById(teamId);
      if (team) {
        setCurrentTeam(team);
        
        // Load team members
        const members = await Promise.all(
          team.members.map(async (member) => {
            const user = await userService.getById(member.Id);
            return {
              ...user,
              role: member.role,
              joinedAt: member.joinedAt
            };
          })
        );
        setTeamMembers(members);
        
        toast.success(`Switched to ${team.name}`);
        loadFiles();
      }
    } catch (err) {
      toast.error("Failed to switch team");
    }
  };
  
  const createTeam = async (teamData) => {
    try {
      const newTeam = await teamService.create({
        ...teamData,
        ownerId: currentUser.Id,
        members: [{ Id: currentUser.Id, role: 'Owner', joinedAt: new Date().toISOString() }]
      });
      
      const updatedTeams = await teamService.getUserTeams(currentUser.Id);
      setUserTeams(updatedTeams);
      
      const allTeams = await teamService.getAll();
      setAvailableTeams(allTeams);
      
      toast.success("Team created successfully");
      return newTeam;
    } catch (err) {
      toast.error("Failed to create team");
      throw err;
    }
  };
  
  const joinTeam = async (teamId) => {
    try {
      await teamService.addMember(teamId, currentUser.Id, 'Member');
      
      const updatedTeams = await teamService.getUserTeams(currentUser.Id);
      setUserTeams(updatedTeams);
      
      toast.success("Successfully joined team");
    } catch (err) {
      toast.error("Failed to join team");
    }
  };
  
  const leaveTeam = async (teamId) => {
    try {
      await teamService.removeMember(teamId, currentUser.Id);
      
      const updatedTeams = await teamService.getUserTeams(currentUser.Id);
      setUserTeams(updatedTeams);
      
      // If leaving current team, switch to another team or clear current team
      if (currentTeam && currentTeam.Id === teamId) {
        const remainingTeams = updatedTeams.filter(t => t.Id !== teamId);
        if (remainingTeams.length > 0) {
          await switchTeam(remainingTeams[0].Id);
        } else {
          setCurrentTeam(null);
          setTeamMembers([]);
        }
      }
      
      toast.success("Successfully left team");
    } catch (err) {
      toast.error("Failed to leave team");
    }
  };
  
  const updateMemberRole = async (teamId, userId, newRole) => {
    try {
      await teamService.updateMemberRole(teamId, userId, newRole);
      
      // Refresh team members
      if (currentTeam && currentTeam.Id === teamId) {
        const updatedTeam = await teamService.getById(teamId);
        const members = await Promise.all(
          updatedTeam.members.map(async (member) => {
            const user = await userService.getById(member.Id);
            return {
              ...user,
              role: member.role,
              joinedAt: member.joinedAt
            };
          })
        );
        setTeamMembers(members);
      }
      
      toast.success("Member role updated successfully");
    } catch (err) {
      toast.error("Failed to update member role");
    }
  };
  
  const removeMember = async (teamId, userId) => {
    try {
      await teamService.removeMember(teamId, userId);
      
      // Refresh team members
      if (currentTeam && currentTeam.Id === teamId) {
        const updatedTeam = await teamService.getById(teamId);
        const members = await Promise.all(
          updatedTeam.members.map(async (member) => {
            const user = await userService.getById(member.Id);
            return {
              ...user,
              role: member.role,
              joinedAt: member.joinedAt
            };
          })
        );
        setTeamMembers(members);
      }
      
      toast.success("Member removed successfully");
    } catch (err) {
      toast.error("Failed to remove member");
    }
  };

  const hasPermission = (action) => {
    if (!currentUser || !currentTeam) return true; // Default permissions for no team
    
    const role = currentUser.role;
    const permissions = {
      'Owner': ['create', 'read', 'update', 'delete', 'manage'],
      'Admin': ['create', 'read', 'update', 'delete'],
      'Member': ['create', 'read', 'update'],
      'Viewer': ['read']
    };
    
    return permissions[role]?.includes(action) || false;
  };

  return {
    // State
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
    advancedFilters,
    
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
    renameFile,
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
    hasPermission,
    uploadFiles
  };
};