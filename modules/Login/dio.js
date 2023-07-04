const { connect }   = require('../../config/db');
const User          = require("../../models/user");

async function isUserExist (data, cb) {
    let result = await User.checkUserExist(data);
    result ? cb(null, result) : cb(null, null);
}


async function getUsers (cb) {
    const result = await User.getUsers();
    result ? cb(null, result) : cb({message: "Users not found"}, null);
}

module.exports = { 
    isUserExist,
    getUsers
};