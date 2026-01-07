const express = require("express");
const router = express.Router();
const {register, login, resetPassword} = require("../controllers/authController");

//LOGIN
router.post("/login", login);

//REGISTER
router.post("/register", register);

//RESET PASSWORD
router.post("/resetPassword", resetPassword);

module.exports = router;