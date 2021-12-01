const mongoose=require("mongoose")
exports.connect=()=>{
    try{
         mongoose.connect(process.env.mongoose,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("database successfully connected ")
    }
    catch(err)
    {
        console.log(err) 
    }

}