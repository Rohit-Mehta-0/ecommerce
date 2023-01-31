const{default: mongoose} = require("mongoose")

const dbConnect = () =>{
    mongoose.set('strictQuery', true); 
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch(err){
        console.log("db error")
    }
}

module.exports= dbConnect