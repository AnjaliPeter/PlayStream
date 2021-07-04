const express = require("express");

const videoRouter = express.Router();

const Videodata = require("../models/Videodata");


// videos
videoRouter.get("/",(req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    Videodata.find()
    .then(function(videos)
    {
        res.send(videos);
    });
});

// add new video
videoRouter.post("/addvideo",(req,res)=>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    console.log(req.body);

    // new video
    var videoItem = {
        title : req.body.title,
        channel : req.body.channel,
        author : req.body.author,
        description : req.body.description,
        category : req.body.category,
        date : req.body.date,
        image : req.body.image,
        video : req.body.video,
        likes : req.body.likes,
        dislike : req.body.dislike,
        rating : req.body.rating,
        views : req.body.views
    }

    var video = Videodata(videoItem);
    video.save();
    // res.send("success");
    
});

// single video
videoRouter.get("/single/:id",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const id = req.params.id;

    Videodata.findOne({_id : id})
    .then(function(video){
        res.send(video);
    });

});

// video category
videoRouter.get("/category/:category",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const category = req.params.category;

    Videodata.find({category : category} )
    .then(function(videos){
        res.send(videos);
    });

});

// related videos
videoRouter.get("/related/:category/:id",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const category = req.params.category;
    const id = req.params.id;

    Videodata.find({ $and: [ { category: category }, { _id: { $ne: id } } ] } )
    .then(function(videos){
        res.send(videos);
    });

});

// videos from a channel
videoRouter.get("/channel/:channelname",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const channelname = req.params.channelname;

    Videodata.find({channel : channelname})
    .then(function(videos){
        res.send(videos);
    });

});

//  remove a video
videoRouter.get("/remove/:id",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const id = req.params.id;
        
    Videodata.deleteOne({_id : id})
    .then(function(video){
        // removed 
    });
        
});

//  remove videos of a channel
videoRouter.get("/removechannel/:channel",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const channel = req.params.channel;
        
    Videodata.deleteMany({channel : channel})
    .then(function(videos){
        // removed 
    });
        
});

// update video
videoRouter.get("/update/:id/:item/:num",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const id = req.params.id;
    const item = req.params.item;
    const num = req.params.num;
        
    if(item == "likes")
    {
        Videodata.updateOne({_id : id},
            { $set :
                {
                    likes : num
                }
            })
        .then(function(video){
            // updated 
        });
    }
    else if(item == "dislikes")
    {
        Videodata.updateOne({_id : id},
            { $set :
                {
                    dislike : num
                }
            })
        .then(function(video){
            // updated 
        });
    }
    else
    {
        res.send("Invalid Request !")
    }
        
});


// exports router
module.exports = videoRouter;