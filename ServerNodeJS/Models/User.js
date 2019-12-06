const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    //username: String,
    //password: String,
    email: String,
    id: String,
    //token: String,
    name: String
});
module.exports = mongoose.model("user",UserSchema);