const mongoose=require("mongoose")
const Schema=mongoose.Schema
const cartList=new Schema({
   

    cart:{
        type:Array
    },
    user:{
        type:String
    }



})
const Cart=mongoose.model("Cart",cartList,"cart")
 module.exports=Cart