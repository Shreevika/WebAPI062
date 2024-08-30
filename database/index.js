const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const initDBConnections = () => {
  // Initialize mongoDB connection
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
    });
};

exports.DBConnect = initDBConnections;
