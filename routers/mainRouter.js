const express               = require("express");
const router                = express.Router();
const registerController    = require("../modules/Register/controller");
const loginController       = require("../modules/Login/controller");
const authentication        = require("../middlewares/authenticate");

router.post('/register', registerController.registerUser);
router.post('/login', loginController.loginUser);
router.get('/users', authentication, loginController.getUsers); //just using the same logincontroller to test the flow. Can be in separate module.


module.exports = router;