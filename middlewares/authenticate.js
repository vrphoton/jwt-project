const tokenManager = require("../middlewares/tokenManager");

async function verifyToken (req, res, next) {
    let token = req.body.token || req.params.token || req.headers['x-access-token'];
    if(!token) {
        return res.status(403).send({message: "Unauthorized access..."});
    }
    try {
        let decodedToken = await tokenManager.verify(token);
        req.user         = decodedToken;
    } 
    catch (error) {
       return res.status(401).send({message: "Invalid Token"})
    }
    return next();
}

module.exports = verifyToken