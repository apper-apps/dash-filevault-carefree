import mockUsers from "@/services/mockData/users.json";

let users = [...mockUsers];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getAll() {
    await delay(300);
    return [...users];
  },

  async getById(id) {
    await delay(200);
    const user = users.find(u => u.Id === parseInt(id));
    return user ? { ...user } : null;
  },

  async getProfile(id) {
    await delay(200);
    const user = users.find(u => u.Id === parseInt(id));
    if (user) {
      const { password, ...profile } = user;
      return { ...profile };
    }
    return null;
  },

  async create(userData) {
    await delay(300);
    const newUser = {
      ...userData,
      Id: Math.max(...users.map(u => u.Id)) + 1,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      isActive: true
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(id, updates) {
    await delay(250);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...updates,
        modified: new Date().toISOString()
      };
      const { password, ...profile } = users[index];
      return { ...profile };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const numericId = parseInt(id);
    users = users.filter(u => u.Id !== numericId);
    return true;
  },

  async updateRole(id, newRole) {
    await delay(250);
    const index = users.findIndex(u => u.Id === parseInt(id));
    if (index !== -1) {
      users[index] = {
        ...users[index],
        role: newRole,
        modified: new Date().toISOString()
      };
      const { password, ...profile } = users[index];
      return { ...profile };
    }
    return null;
  },

  async getUsersByTeam(teamId) {
    await delay(200);
    return users
      .filter(user => user.teams.includes(parseInt(teamId)))
      .map(user => {
        const { password, ...profile } = user;
        return { ...profile };
      });
  }
};