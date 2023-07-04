const bcrypt        = require("bcryptjs");
const registerDIO   = require("../Register/dio");

function registerUser (details, cb) {

    getHashedPassword(details.password, function(err, hashPWD) {
        if(err) {
            cb(err, null);
            return;
        }
        details.password = hashPWD;
        proceedToRegisterUser();
    });  

    function proceedToRegisterUser() {
        registerDIO.registerUser(details, function(err, result) {
            if(err) {
                cb(err, null);
                return;
            }
            cb(err, result);
        });
    }    
}

function getHashedPassword (pPassword, cb) {
    bcrypt.hash(pPassword, 10, function(err, hash) {
        if(err) {
            cb(err, null);
            return;
        }
        cb(null, hash);
    });
}

module.exports = { 
    registerUser
};