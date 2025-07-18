import mockTeams from "@/services/mockData/teams.json";

let teams = [...mockTeams];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const teamService = {
  async getAll() {
    await delay(300);
    return [...teams];
  },

  async getById(id) {
    await delay(200);
    const team = teams.find(t => t.Id === parseInt(id));
    return team ? { ...team } : null;
  },

async create(teamData) {
    await delay(300);
    const newId = teams.length > 0 ? Math.max(...teams.map(t => t.Id)) + 1 : 1;
    const newTeam = {
      ...teamData,
      Id: newId,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      members: teamData.members || [],
      settings: teamData.settings || {
        allowGuestAccess: false,
        defaultFilePermissions: "team",
        storageLimit: 10737418240
      }
    };
    teams.push(newTeam);
    return { ...newTeam };
  },

  async update(id, updates) {
    await delay(250);
    const index = teams.findIndex(t => t.Id === parseInt(id));
    if (index !== -1) {
      teams[index] = {
        ...teams[index],
        ...updates,
        modified: new Date().toISOString()
      };
      return { ...teams[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(200);
    const numericId = parseInt(id);
    teams = teams.filter(t => t.Id !== numericId);
    return true;
  },

  async addMember(teamId, userId, role = 'Member') {
    await delay(250);
    const teamIndex = teams.findIndex(t => t.Id === parseInt(teamId));
    if (teamIndex !== -1) {
      const team = teams[teamIndex];
      const member = {
        Id: parseInt(userId),
        role,
        joinedAt: new Date().toISOString()
      };
      
      team.members = team.members || [];
      team.members.push(member);
      team.modified = new Date().toISOString();
      
      return { ...team };
    }
    return null;
  },

  async removeMember(teamId, userId) {
    await delay(250);
    const teamIndex = teams.findIndex(t => t.Id === parseInt(teamId));
    if (teamIndex !== -1) {
      const team = teams[teamIndex];
      team.members = team.members.filter(m => m.Id !== parseInt(userId));
      team.modified = new Date().toISOString();
      
      return { ...team };
    }
    return null;
  },

  async updateMemberRole(teamId, userId, newRole) {
    await delay(250);
    const teamIndex = teams.findIndex(t => t.Id === parseInt(teamId));
    if (teamIndex !== -1) {
      const team = teams[teamIndex];
      const memberIndex = team.members.findIndex(m => m.Id === parseInt(userId));
      if (memberIndex !== -1) {
        team.members[memberIndex].role = newRole;
        team.modified = new Date().toISOString();
        
        return { ...team };
      }
    }
    return null;
  },

  async getUserTeams(userId) {
    await delay(200);
    return teams
      .filter(team => team.members.some(member => member.Id === parseInt(userId)))
      .map(team => ({ ...team }));
  }
};