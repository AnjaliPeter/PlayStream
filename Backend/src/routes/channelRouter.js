const express = require("express");

const channelRouter = express.Router();

const Channeldata = require("../models/Channeldata");


// channels
channelRouter.get("/",(req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    Channeldata.find()
    .then(function(channels)
    {
        res.send(channels);
    });
});

// add new channel
channelRouter.post("/addchannel",(req,res)=>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    console.log(req.body);

    // new channel
    var channelItem = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        channel : req.body.channel,
        category : req.body.category,
        image : req.body.image,
        description : req.body.description,
        email : req.body.email,
        phoneno : req.body.phoneno,
        country : req.body.country,
        password : req.body.password,
        rating : req.body.rating,
        subscribers : req.body.subscribers
    }

    var channel = Channeldata(channelItem);
    channel.save();
    // res.send("success");
    
});

// search channel
channelRouter.get("/searchchannel/:email",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const email = req.params.email;

    Channeldata.findOne({email : email})
    .then(function(channel){
        res.send(channel);
        console.log(channel);
    });

});

// single channel
channelRouter.get("/single/:id",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const id = req.params.id;

    Channeldata.findOne({_id : id})
    .then(function(channel){
        res.send(channel);
    });

});

// single channelpic
channelRouter.get("/logo/:channel",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const channel = req.params.channel;

    Channeldata.findOne({channel : channel})
    .then(function(channel){
        res.send(channel);
    });

});

// channel category
channelRouter.get("/category/:category",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const category = req.params.category;

    Channeldata.find({category : category} )
    .then(function(channels){
        res.send(channels);
    });

});

// related channels
channelRouter.get("/related/:category/:id",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const category = req.params.category;
    const id = req.params.id;

    Channeldata.find({ $and: [ { category: category }, { _id: { $ne: id } } ] } )
    .then(function(channels){
        res.send(channels);
    });

});

//  remove a channel
channelRouter.get("/remove/:id",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const id = req.params.id;
        
    Channeldata.deleteOne({_id : id})
    .then(function(video){
        // removed 
    });
        
});

// sort channels
channelRouter.get("/sort/:item",(req,res) =>
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const item = req.params.item;

    if(item == "category")
    {
        Channeldata.find().sort({category:1})
        .then(function(channels)
        {
            res.send(channels);
        });
    }
    else if(item == "channel")
    {
        Channeldata.find().sort({channel:1})
        .then(function(channels)
        {
            res.send(channels);
        });
    }
    else
    {
        res.send("Invalid Request !");
    }
   
});

// update channel
channelRouter.get("/update/:id/:num",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const id = req.params.id;
    const num = req.params.num;
    
    Channeldata.updateOne({_id : id},
        { $set :
            {
                subscribers : num
            }
        })
    .then(function(channel){
        // updated 
    });
   
});

// reset password
channelRouter.get("/reset/:email/:phone/:password",(req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const email = req.params.email;
    const phone = req.params.phone;
    const password = req.params.password;
    
    Channeldata.updateOne({$and: [{email : email}, {phoneno : phone}]},
        { $set :
            {
                password : password
            }
        })
    .then(function(channel){
        // reset
    });
   
});


// exports router
module.exports = channelRouter;