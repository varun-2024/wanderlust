const Listing = require("../models/listing");
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res, next) => {
  const { id } = req.params;
  const showListing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!showListing) {
    req.flash("error", "Sorry, Listing Does Not Exist!");
    return res.redirect("/listings");
  }
  console.log("Listing :", showListing);
  res.render("listings/show.ejs", { showListing });
};

module.exports.createListings = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "...", filename);
  console.log("Post request Received");
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid data for Listing");
  }
  const newListing = new Listing(req.body.listing);
  console.log("Req User : ", req.user);
  newListing.owner = req.user._id;
  newListing.image = { filename, url };
  await newListing.save();
  console.log("New Listing Created:", newListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const editListing = await Listing.findById(id);
  if (!editListing) {
    req.flash("error", "Sorry, Listing Does Not Exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = editListing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { editListing, originalImageUrl });
};

module.exports.updateListings = async (req, res) => {
  console.log("Update Listing PUT request Received");
  if (!req.body.listing) {
    throw new ExpressError(400, "Send Valid data for Listing");
  }
  const { id } = req.params;
  console.log(req.body.listing);
  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    {
      new: true,
    }
  );
  if (typeof req.file !== "undefined" /* && req.file !== null */) {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "...", filename);
    updatedListing.image = { filename, url };
    await updatedListing.save();
  }
  console.log("Updated Listing:", updatedListing);
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListings = async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id, { deleted: true });
  console.log("Deleted Listing:", deletedListing, "Listing Id:", id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};
