// Require Express
const express = require("express");
// Require Router
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});
router.post(
  "/signup",
  asyncWrap(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "User was registered Successfully");
      res.redirect("/listings");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  asyncWrap(async (req, res) => {
    res.send("Welcome, you ar logged in!");
  })
);

module.exports = router;
