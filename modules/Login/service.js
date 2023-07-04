const bcrypt        = require("bcryptjs");
const loginDIO      = require("../Login/dio");

function isUserExist (email, cb) {
    loginDIO.isUserExist({email : email}, function(err, result) {
        if(err) {
            cb(err, null);
            return;
        }
        cb(err, result);
    });
}

function getUsers(cb) {
    loginDIO.getUsers(cb);
}

module.exports = { 
    isUserExist,
    getUsers
};