module.exports.isLoggedIn = (req, res, next) => {
  console.log(req);
  if (!req.isAuthenticated()) {
    req.flash("error", "You must Login to create a Listing");
    return res.redirect("/login");
  }
  next();
};
