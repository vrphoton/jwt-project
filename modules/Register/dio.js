const { connect }   = require('../../config/db');
const User          = require("../../models/user");

function registerUser (data, cb) {

    isUserAlredyExist(data, function(error, result) {
        if(error) {
            cb(error, null);
            return;
        }
        result ? cb({message: "User already exists..."}) : proceedToRegisterUser();
    });

    async function proceedToRegisterUser () {
        try {
            const newUser   = new User(data);
            const result    = await newUser.registerUser();
            cb(null, result);
        } 
        catch (error) {
            cb(null, error);
        }  
    }      
}

async function isUserAlredyExist (data, cb) {
    let result = await User.checkUserExist({email : data.email});
    result ? cb(null, result) : cb(null, null);
}

module.exports = { 
    registerUser 
};