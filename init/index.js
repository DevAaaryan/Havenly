const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main()
    .then(() => {
        console.log("connection succesful");
    })
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Havenly');
}

const initdb = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"68dfcff6d5850ab69c9e7243"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
}

initdb();