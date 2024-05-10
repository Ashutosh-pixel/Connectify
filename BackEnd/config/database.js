const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URI).then(() => {
      console.log("database connected");
    });
  } catch (error) {
    console.log("ERROR : ", error.message);
  }
}

module.exports = dbConnect;
