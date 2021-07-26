const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        return res.status(401).json({
            message: "Authentication failed"
        })
    }
}

const getLoggedInUser = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                return null;
            } else {
                return User.findById(decodedToken.userId);
            }
        });
    } else {
        return null;
    }
};

module.exports = {
    checkAuth,
    getLoggedInUser
}
