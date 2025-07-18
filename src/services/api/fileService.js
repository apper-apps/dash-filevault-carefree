import mockFiles from "@/services/mockData/files.json";

let files = [...mockFiles];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fileService = {
  async getAll() {
    await delay(300);
    return [...files];
  },

  async getById(id) {
    await delay(200);
    const file = files.find(f => f.Id === parseInt(id));
    return file ? { ...file } : null;
  },

  async getByParentId(parentId) {
    await delay(250);
    const numericParentId = parentId === null ? null : parseInt(parentId);
    return files.filter(f => f.parentId === numericParentId).map(f => ({ ...f }));
  },

  async create(fileData) {
    await delay(300);
    const newFile = {
      ...fileData,
      Id: Math.max(...files.map(f => f.Id)) + 1,
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };
    files.push(newFile);
    return { ...newFile };
  },

  async update(id, updates) {
    await delay(250);
    const index = files.findIndex(f => f.Id === parseInt(id));
    if (index !== -1) {
      files[index] = {
        ...files[index],
        ...updates,
        modified: new Date().toISOString()
      };
      return { ...files[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const numericId = parseInt(id);
    const fileToDelete = files.find(f => f.Id === numericId);
    
    if (fileToDelete) {
      // If it's a folder, also delete all children
      if (fileToDelete.isFolder) {
        const childrenToDelete = files.filter(f => f.parentId === numericId);
        childrenToDelete.forEach(child => {
          files = files.filter(f => f.Id !== child.Id);
        });
      }
      
      files = files.filter(f => f.Id !== numericId);
      return true;
    }
    return false;
  },

  async move(id, newParentId) {
    await delay(300);
    const numericId = parseInt(id);
    const numericParentId = newParentId === null ? null : parseInt(newParentId);
    
    const fileIndex = files.findIndex(f => f.Id === numericId);
    if (fileIndex !== -1) {
      const file = files[fileIndex];
      const oldPath = file.path;
      
      // Update parent path
      let newPath;
      if (numericParentId === null) {
        newPath = `/${file.name}`;
      } else {
        const parent = files.find(f => f.Id === numericParentId);
        newPath = `${parent.path}/${file.name}`;
      }
      
      files[fileIndex] = {
        ...file,
        parentId: numericParentId,
        path: newPath,
        modified: new Date().toISOString()
      };

      // Update paths for all children if it's a folder
      if (file.isFolder) {
        const updateChildrenPaths = (parentId, newParentPath) => {
          const children = files.filter(f => f.parentId === parentId);
          children.forEach(child => {
            const childIndex = files.findIndex(f => f.Id === child.Id);
            if (childIndex !== -1) {
              files[childIndex] = {
                ...files[childIndex],
                path: `${newParentPath}/${child.name}`,
                modified: new Date().toISOString()
              };
              
              if (child.isFolder) {
                updateChildrenPaths(child.Id, `${newParentPath}/${child.name}`);
              }
            }
          });
        };
        
        updateChildrenPaths(numericId, newPath);
      }
      
return { ...files[fileIndex] };
    }
    return null;
  },

  async updateColor(id, color) {
    await delay(200);
    const numericId = parseInt(id);
    const fileIndex = files.findIndex(f => f.Id === numericId);
    
    if (fileIndex !== -1 && files[fileIndex].isFolder) {
      files[fileIndex] = {
        ...files[fileIndex],
        color: color,
        modified: new Date().toISOString()
      };
      return { ...files[fileIndex] };
    }
    return null;
},

  async toggleFavorite(id) {
    await delay(200);
    const numericId = parseInt(id);
    const fileIndex = files.findIndex(f => f.Id === numericId);
    
    if (fileIndex !== -1 && files[fileIndex].isFolder) {
      files[fileIndex] = {
        ...files[fileIndex],
        isFavorite: !files[fileIndex].isFavorite,
        modified: new Date().toISOString()
      };
      return { ...files[fileIndex] };
    }
    return null;
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return files
      .filter(f => f.name.toLowerCase().includes(searchTerm))
      .map(f => ({ ...f }));
  }
};