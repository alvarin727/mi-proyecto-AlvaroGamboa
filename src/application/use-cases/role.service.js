const Role = require('../../domain/entities/role.entity');

class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    
    async getAllRoles() {
        return this.roleRepository.getAll();
    }

    async getRoleById(id) {
        return this.roleRepository.getById(id);
    }

    async createRole(roleData) {
        const roleEntity = new Role(
            null,
            roleData.name
        );
        const existingRole = await this.roleRepository.getByName(roleData.name);
        if (existingRole) {
            throw new Error('Role already exists');
        }
        return this.roleRepository.create(roleEntity);
    }

    async updateRole(id, roleData) {
        const roleEntity = new Role(
            id,
            roleData.name
        );
        return this.roleRepository.update(id, roleEntity);
    }

    async deleteRole(id) {
        return this.roleRepository.delete(id);
    }
}
module.exports = RoleService;
