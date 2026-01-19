const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


//Database Setup--->
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//Calling main function
main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

//Function for database setup
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDb = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner:"6921eeb58b484a5b2f31e66e"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};


initDb();