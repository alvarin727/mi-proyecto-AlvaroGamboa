class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    
    getAll = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json({ message: error.message });
            }
             if (error.message.includes('not found')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await this.userService.updateUser(id, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
             if (error.message.includes('not found')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = UserController;
