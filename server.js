// import cors from "cors";
import express from "express";
import  mongoose  from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
// var express = require(express);

var app=express();
const PORT= process.env.PORT || 2020;
// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, "client", "build")))

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.use(cors());
var PROCESS= dotenv.config();
// var dotenv=dotenv();



mongoose.connect(process.env.MONGO);
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    uid : String,
    list : []
})


const User= new mongoose.model("User",userSchema)

app.post("/api/signup",(req,res)=>{
    const {uid,name,email}=req.body;
    console.log(req.body);
    const user = new User({uid,name,email})
    user.save(err=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({message:"user added successfully"});
        }
    })
})

app.get("/api/getlist/:id",(req,res)=>{
    const uid= req.params.id;
    console.log("uid",uid);
     User.findOne({uid:uid},(error,user)=>{
        if(user){
            res.send(user.list);
        }
        else{
            console.log("hi , error",error);
        }
    })
    
        
    
})

app.post("/api/addtask",(req,res)=>{
    const {uid,add}=req.body;
    console.log(add);
    User.findOneAndUpdate({uid:uid},{list:add})
        .then(
            User.findOne({uid:uid},(err,user)=>{
                if(user){
                    // console.log("task added");
                    // console.log(user);
                    res.send({message:"task added"})
                }
                if(err){
                    console.log(err)
                }
            })
        )          
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"./client/build", "index.html"))
    })
}

app.listen(PORT,() =>{
    console.log('server file is running');
});