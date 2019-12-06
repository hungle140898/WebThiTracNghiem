const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    Lession_id:String ,
    TitleOfQuestion : String ,
    Answer_A : String ,
    Answer_B : String ,
    Answer_C : String ,
    Answer_D : String ,
    Result:String
});
module.exports = mongoose.model("Question",QuestionSchema);