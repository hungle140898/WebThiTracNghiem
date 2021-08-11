const mongoose = require("mongoose");

const Time = new mongoose.Schema({
  Minutes: Number,
  Seconds: Number,
  Hours: Number,
});
module.exports = mongoose.model("Time", Time);
