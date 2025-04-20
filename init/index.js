// Require Mongoose
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// Require Data
const initData = require("./data.js");
// Require Listing Model
const Listing = require("../models/listing.js");
// Mongo DB Connection
main()
  .then(() => {
    console.log("Conected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
// Data Initialization
const initDB = async () => {
  await Listing.deleteMany({});
  //console.log("Data to be inserted:", initData.data); // Access the `data` property
  const insertedData = await Listing.insertMany(initData.data); // Use `initData.data` here
  console.log("Inserted Data:", insertedData); // Log the inserted documents
  console.log("Data was Inserted Successfully");
};

initDB();
