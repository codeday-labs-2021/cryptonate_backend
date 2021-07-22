const jwt = require("jsonwebtoken");

/*
The header with key Authorization needs to be set with the value "Bearer <token>".
For example,
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX
 */

module.exports = (req, res, next) => {
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
