const loginService    = require("../Login/service");
const tokenManager    = require("../../middlewares/tokenManager");
const bcrypt          = require("bcryptjs");

function loginUser (req, res) {

    let data = getLoginData(req.body);

    if(!(data.email && data.password)) {
        res.status(401).send({message : 'All details are required'});
    }
    else {
        isUserExist(data.email, function(error, result) {
            if(error) {
                res.status(401).send(error);
                return;
            }
            result ?  proceedToComparePassword(result) : res.status(401).send({message : "User doesn't exist..."});
        });
    }

    function proceedToComparePassword(result) {
        comparePassword(data.password, result.password, function(error, status) {
            if(error) {
                res.status(401).send(error);
                return;
            }
            if(status) {
                createTokenAndSend(result);
            }
            else {
                res.status(401).send({message: "Password entered is not valid..."});
            }
        });        
    }

    async function createTokenAndSend (result) {
        try {
            let loggedInUser  = {
                userId : result._id,
                email  : result.email
            }
            let token       = await tokenManager.createToken(loggedInUser);
            result.token    = token;
            delete result.password;
            res.status(201).send(result);
        } catch (error) {
            res.status(401).send({message: "An error occured while logging in the User"});
        }
    }
}

function getUsers (req, res) {
    loginService.getUsers(function(error, result) {
        if(error) {
            res.status(401).send(error);
            return;
        }
        res.status(200).send(result);
    });
}

function isUserExist (email, cb) {
    loginService.isUserExist(email, cb);
}

function comparePassword (plainPWD, hashedPWD, cb) {
    bcrypt.compare(plainPWD, hashedPWD, function(error, status) {
        if(error) {
            cb(error, null);
            return;
        }
        cb(null, status);
    });
}

function getLoginData (requestData) {
    return {
        email       : requestData.email,
        password    : requestData.password
    }
}

module.exports = { 
    loginUser,
    getUsers
};