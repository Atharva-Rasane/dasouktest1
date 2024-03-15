const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rratharva:7I7SfmfmvZzoBRXm@cluster0.pnh5rxl.mongodb.net/dasouk_db"
    );
    console.log("connected successfully to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
