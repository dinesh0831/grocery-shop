const mongoose=require("mongoose")
const Schema=mongoose.Schema
const orderList=new Schema({
    contact:{
        type:Number
    },
    email:{
        type:String
    },
    address:{
        type:Object
    },
    order:{
        type:Array
    },
    name:{
        type:String
    }
})
const Order=mongoose.model("Order",orderList,"order")
 module.exports=Order