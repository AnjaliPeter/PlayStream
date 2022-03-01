const express = require("express");
const app = new express();

// port selection
const port = process.env.PORT || 9999;
console.log("server is on "+port);

var cors = require("cors");
app.use(cors());

var bodyparser = require("body-parser");
app.use(bodyparser.json());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/",(req,res)=>
{
    res.send("Hai,Welcome to PlayStream !!!");
});

// routers
const videoRouter = require("./src/routes/videoRouter");
const channelRouter = require("./src/routes/channelRouter");

app.use("/videos",videoRouter);
app.use("/channels",channelRouter);

// server port
app.listen(port);
