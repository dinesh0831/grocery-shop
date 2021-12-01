const Cart=require("../schema/cartSchema")


exports.postCart=async(req,res)=>{
     const id=req.params.user
     console.log(req.body.cart)
     console.log(id)
     const userCart=await Cart.findOne({user:id})
     console.log(userCart.cart)
     
     let carts=[...userCart.cart]
     console.log(carts)

     carts.push(req.body.cart)
      const response=await Cart.findByIdAndUpdate(userCart._id,{
            cart:carts
        
      },{new:true})
      res.send(response)


}
exports.getCart=async(req,res)=>{
      const id=req.params.byuser
      const userCart=await Cart.findOne({user:id})
     console.log(userCart.cart)
     res.send(userCart)

}
exports.removeItem=async(req,res)=>{
      const id=req.params.editCart
      const userCart=await Cart.findOne({user:id})
      const response=await Cart.findByIdAndUpdate(userCart._id,{
            cart:req.body.cart
      },{new:true})
      res.send(response)

}