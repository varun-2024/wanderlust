// Require Express
const express = require("express");
// Require Router
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", userController.renderSignUpForm);
router.post("/signup", asyncWrap(userController.signUpUser));

router.get("/login", userController.renderLogInForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  asyncWrap(userController.logInUser)
);

router.get("/logout", asyncWrap(userController.logOutUser));

module.exports = router;
