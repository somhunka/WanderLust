const express = require("express");
const router = express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

//Signup Routes
router.route("/signup")
    .get(userController.RenderSignupForm)
    .post(wrapAsync(userController.signup));

//Login Routes
router.route("/login")
    .get(userController.RenderLoginForm)
    .post(saveRedirectUrl,
        passport.authenticate("local",{failureRedirect:'/login', failureFlash : true}),userController.login);


router.get("/logout",userController.logout);

module.exports = router;