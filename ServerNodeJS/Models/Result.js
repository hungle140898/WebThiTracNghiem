const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    User_ID:String ,
    UserName : String ,
    Result:Array,
    TitleLession:String,
});
module.exports = mongoose.model("Result",ResultSchema);