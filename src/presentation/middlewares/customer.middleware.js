function isCustomer(req, res, next) {
    // this middleware must run AFTER authenticateToken
    const { roles } = req.user;

    if (!roles || !roles.includes('customer')) {
        return res.status(403).json({ message: 'You must login first' });
    }

    next();
}

module.exports = isCustomer;
