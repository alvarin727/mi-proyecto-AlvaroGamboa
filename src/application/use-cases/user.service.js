const User = require('../../domain/entities/user.entity');
const bcrypt = require('bcryptjs');

class UserService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository; // To validate and get role IDs
    }
    
    async getAllUsers() {
        return this.userRepository.getAll();
    }

    async getUserById(id) {
        return this.userRepository.getById(id);
    }

    async createUser(userData) {
        const { name, email, password, roles } = userData;

        // Check if user already exists
        const existingUser = await this.userRepository.getByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Validate and get role IDs
        const roleIds = await this.getRoleIds(roles);

        const userEntity = new User(
            null,
            name,
            email,
            hashedPassword,
            roleIds
        );
        return this.userRepository.create(userEntity);
    }

    async updateUser(id, userData) {
        const { name, email, password, roles } = userData;

        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const roleIds = roles ? await this.getRoleIds(roles) : undefined;
        
        const userEntity = new User(
            id,
            name,
            email,
            hashedPassword, // Can be undefined
            roleIds // Can be undefined
        );

        return this.userRepository.update(id, userEntity);
    }

    async deleteUser(id) {
        return this.userRepository.delete(id);
    }

    // Helper to get role IDs from role names
    async getRoleIds(roleNames) {
        if (!roleNames || roleNames.length === 0) {
            // Assign a default role if none are provided, e.g., 'user'
            const defaultRole = await this.roleRepository.getByName('user');
            if (!defaultRole) throw new Error("Default role 'user' not found.");
            return [defaultRole.id];
        }

        const roleIds = [];
        for (const roleName of roleNames) {
            const role = await this.roleRepository.getByName(roleName);
            if (!role) {
                throw new Error(`Role '${roleName}' not found.`);
            }
            roleIds.push(role.id);
        }
        return roleIds;
    }
}
module.exports = UserService;
