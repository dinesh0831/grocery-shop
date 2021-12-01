const Product = require("../schema/productSchema")


exports.productPost=async(req,res,next)=>{
    const productList=new Product({
        name:req.body.name,
        variant:req.body.variant,
        price:req.body.price,
        photos:req.body.photos,
        total_Quantity:req.body.total_Quantity,
        weight:req.body.weight,
        userQuantity:1
        

    }) 
    const response=await productList.save()
    res.send(response)
}
exports.getProduct=async(req,res)=>{
    const response=await Product.find()
    res.send(response)

}
exports.productUpdate=async(req,res)=>{
    const id=req.params.id
    try{
    const response=await Product.findByIdAndUpdate(id,
        {
           
        },{new:true})
    res.send(response)
    }
    catch(err){
        console.log(err)
    }
}
