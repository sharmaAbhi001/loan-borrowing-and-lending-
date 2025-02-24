const mongoose = require("mongoose")



const connectToDB = async ()=>{

    await mongoose.connect(process.env.Mongo_URI)

};

module.exports= connectToDB;
