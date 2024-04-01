const express = require("express");
const { loginController, registerController } = require("../controllers/userCtrl").default;

//router onject
const router = express.Router();

//router 
//LOGIN-POST
router.post("/login", loginController)

router.post("/register", registerController)

module.exports = router;