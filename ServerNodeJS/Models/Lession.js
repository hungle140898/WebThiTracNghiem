const mongoose = require("mongoose");

const LessionSchema = new mongoose.Schema({
   
    NameOfLession : String ,
    ThemeOfLession : String ,
    NumberOfQuestions : Number,
    Timing : Number,
    Level : String,
    Score : Number
});
module.exports = mongoose.model("Lession",LessionSchema);