const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playstream");

const Schema = mongoose.Schema;

// schema for video
const VideoSchema = new Schema(
    {
        title : String,
        category : String,
        video : String,
        image : String,
        description : String,
        rating : Number,
        likes : Number,
        dislike : Number,
        channel : String,
        author : String,
        views : Number,
        date : String
    }
);

// model for video
var Videodata = mongoose.model("videodata",VideoSchema);

// exports model
module.exports = Videodata;