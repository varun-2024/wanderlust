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
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "681e851e67376585d2840d06",
  }));
  //console.log("Data to be inserted:", initData.data);
  const insertedData = await Listing.insertMany(initData.data);
  console.log("Inserted Data:", insertedData);
  console.log("Data was Inserted Successfully");
};

initDB();
