const _               = require("lodash");
const registerService = require("../Register/service");
const tokenManager    = require("../../middlewares/tokenManager");

async function registerUser (req, res) {
    let details     = getRegisterationDetails(req.body);
    let response    = await validateRegistration(details);
    if(response.valid) {
        registerService.registerUser(details, function(err, result) {
            if(err) {
                res.status(401).send(err);
                return;
            }
            result ? createTokenAndSend(result) : res.status(401).send({message: "User is not registered..."});
        });
    }
    else {
        res.status(401).send(response.message);
    }  
    
    async function createTokenAndSend(userResult) {
        try {
            let registeredUser  = {
                userId : userResult._id,
                email  : userResult.email
            }
            let token           = await tokenManager.createToken(registeredUser);
            userResult.token    = token;
            res.status(201).send(userResult);
        } catch (error) {
            console.log("error", error);
            res.status(401).send({message: "An error occured while creating the User"});
        }
    }
}

function validateRegistration (details) {
    try {
        // here common validation we can implement
        if(!(details.firstName && details.lastName && details.email && details.password)) {
            return {message : "All details are required"};
        }
        else {
            return {valid : true}
        }
    }
    catch(error) {
        return error;
    }
}

function getRegisterationDetails(data) {
    return {
        firstName   : data.firstName,
        lastName    : data.lastName,
        email       : data.email.toLowerCase(),
        password    : data.password
    }
}

module.exports = { 
    registerUser 
};