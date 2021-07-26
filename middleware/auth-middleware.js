const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        req.userData = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {
    checkAuth,
    checkUser
}
