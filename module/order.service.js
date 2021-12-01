const Order=require("../schema/orderSchema")
const Cart=require("../schema/cartSchema");



exports.postOrder=async(req,res)=>{


  const  Orders=new Order({
        contact:req.body.contact,
        email:req.body.email,
        address:req.body.address,
        order:req.body.order,
        name:req.body.name

    })
    const Carts=await Cart.findOneAndUpdate({user:req.body.user},{
      cart:[]
    },{new:true})
    const response=await Orders.save()
   
    res.send({response,Carts})


}

exports.getById=async(req,res)=>{
  console.log(req.user.user.email)
  const email=req.user.user.email
  const response=await Order.findOne({email:email})
  res.send(response)
  
}
