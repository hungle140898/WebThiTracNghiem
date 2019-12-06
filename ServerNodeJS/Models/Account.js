const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
   Username : String,
   Password : String
});
module.exports = mongoose.model("Account",AccountSchema);

