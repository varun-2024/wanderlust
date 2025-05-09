// Require Express
const express = require("express");
// Require Router
const router = express.Router({ mergeParams: true });

const User = require("../models/user.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});
router.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);
  console.log(registeredUser);
  req.flash("success", "User was registered Successfully");
  res.redirect("/listings");
});

module.exports = router;
