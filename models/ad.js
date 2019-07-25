//framework for work with  mongo 
var mongoose = require("mongoose");

//setando a new db schema 
var adSchema = new mongoose.Schema({
    
    title : String,
    image :String,
    description : String,
    price : Number,
    author : {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username: String
    }
    
});

//creating the template "Ad" that uses the above schema, with this template make all op
module.exports = mongoose.model("Ad", adSchema );