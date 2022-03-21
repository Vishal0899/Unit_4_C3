

const express = require("express");
const mongoose= require("mongoose");


const app = express();

const connect = function (){
    mongoose.connect("mongodb://127.0.0.1:27017/Unit_4_C3");
}

const User_model = mongoose.Schema({
    firstName : {type : String, require : true, minlength : 3, maxlength : 30},
    LastName : {type : String, minlength : 3, maxlength : 30},
    age : {type : Number, required : true,},
    email : {type : String, required : true, unique : true},
    profileImages: {type : String, required : true},
    
},
{
    timestamps : {type : String, required : true},
    versionKey : false,
})

const User = mongoose.model("user",User_model);

const Book_Model = mongoose.Schema({  
    user_Id : {type : mongoose.Schema.Types.ObjectId, ref : "user", required : true}, 
    publication_Id : {type : mongoose.Schema.Types.ObjectId, ref : "user", required : true},
    likes : {type : Number},
    coverImage : {type : String, required : true},
    content : {type : String, required : true},
},
{
    timestamps : {type : String, required : true},
    versionKey : false,
})

const Book = mongoose.model("book",Book_Model);

const Publication_Model = mongoose.Schema({
    name :  {type : String},
},
{
    timestamps : {type : String, required : true},
    versionKey : false,
})

const Publication = mongoose.model("publication",Publication_Model);

const Comment_Model = ({
    user_Id : {type : mongoose.Schema.Types.ObjectId, ref : "user", required : true}, 
    book_Id : {type : mongoose.Schema.Types.ObjectId, ref : "book", required : true},
    body : {type : String, required : true},
},
{
    timestamps : {type : String, required : true},
    versionKey : false,
})

const Comment = mongoose.model("comment",Comment_Model);


app.post("/register",async (req,res) => {
    try{
        const data = await User.create(req.body);
        console.log(req.body);
        return res.status(200).send(data);
    }catch(err){
        return res.status(500).send({message : err.message});
    }
})

app.post("/books", async (req,res) => {
    try{
        const data = await Book.create(req.body);
        return res.status(200).send(data);
    }catch(err){
        return res.status(500).send({message : err.message});
    }
})

app.post("/comments", async (req,res) => {
    try{
        const data = await Comment.create(req.body);
        return res.status(200).send(data);
    }catch(err){
        return res.status(500).send({message : err.message});
    }
})

app.listen(3000,async(req,res) =>{
    try{
        console.log("Listening on port 3000");
        await connect();
    }catch(err){
        console.log({message : err.message});
    }
})