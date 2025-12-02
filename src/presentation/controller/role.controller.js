class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    
    getAll = async (req, res) => {
        try {
            const roles = await this.roleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const role = await this.roleService.getRoleById(id);
            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const role = await this.roleService.createRole(req.body);
            res.status(201).json(role);
        } catch (error) {
            if (error.message === 'Role already exists') {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error creating role' });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const role = await this.roleService.updateRole(id, req.body);
            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this.roleService.deleteRole(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = RoleController;
