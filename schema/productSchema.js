 const mongoose=require("mongoose")
 const Schema=mongoose.Schema

 const ProductsList=new Schema({
     name:{
         type:String,
         required:true
     },
     variant:{
         type:String,
         required:true,
     },
     weight:{
         type:Number
     },
     price:{
         type:Number,
         required:true,
     },
     photos:{
         type:Object

     },
     total_Quantity:{
         type:Number
     },
     userQuantity:{
         type:Number
     }

 })
 const Products=mongoose.model("Product",ProductsList,"product")
 module.exports=Products