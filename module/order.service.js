const Order=require("../schema/orderSchema")
const Cart=require("../schema/cartSchema");
const razorpay=require("razorpay")
var razor=new razorpay({
  key_id: 'rzp_test_CJysw9ND9WCm9G',
  key_secret: 'AVKtxudx3BsiyVjOmlgqCBVs',
})




exports.postOrder=async(req,res)=>{

console.log(req.body)
  const  Orders=new Order({
        contact:req.body.contact,
        email:req.body.email,
        address:req.body.address,
        order:req.body.order,
        name:req.body.name

    })
    const data=await razor.orders.create({
      amount:req.body.amount*100,
      currency:"INR",
     

    })
    console.log(data)
    const Carts=await Cart.findOneAndUpdate({user:req.body.user},{
      cart:[]
    },{new:true})
    const response=await Orders.save()
   
    res.send({response,Carts,id:data.id,currency:"INR",amount:data.amount})


}

exports.getById=async(req,res)=>{
  console.log(req.user.user.email)
  const email=req.user.user.email
  const response=await Order.findOne({email:email})
  res.send(response)
  
}
