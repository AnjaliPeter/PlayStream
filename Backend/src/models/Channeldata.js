const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playstream");

const Schema = mongoose.Schema;

// schema for channel
const ChannelSchema = new Schema(
    {
        firstname : String,
        lastname : String,
        channel : String,
        category : String,
        image : String,
        description : String,
        email : String,
        phoneno : Number,
        country : String,
        password : String,
        rating : Number,
        subscribers : Number
    }
);

// model for channel
var Channeldata = mongoose.model("channeldata",ChannelSchema);

// exports model
module.exports = Channeldata;