const express = require("express");

const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

//sign in user

router.post("/signup", signupUser);

//login user

router.post("/login", loginUser);

module.exports = router;
