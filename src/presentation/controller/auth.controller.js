const AuthService = require('../../application/use-cases/auth.service');
const UserMongoRepository = require('../../infrastructure/repositories/database/mongo/user.mongo.repository');

const authService = new AuthService(new UserMongoRepository());

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const result = await authService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            // Distinguish between client errors and server errors if possible
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).json({ message: 'An internal error occurred' });
        }
    }
}

module.exports = new AuthController();
