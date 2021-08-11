const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  Test_id: String,
});
module.exports = mongoose.model("Result", TestSchema);
