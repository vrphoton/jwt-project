const jwt                   = require("jsonwebtoken");
const { TOKEN_PRIVATE_KEY } = process.env;

async function createToken (data) {
    let token = jwt.sign(data, TOKEN_PRIVATE_KEY, {expiresIn : "2h"});
    return token;
}

async function verify (token) {
    return jwt.verify(token, TOKEN_PRIVATE_KEY);
}

module.exports = {
    createToken,
    verify
}