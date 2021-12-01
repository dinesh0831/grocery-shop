 const Product = require("../schema/productSchema")

 exports.getProduct=async(req,res)=>{
    const response=await Product.find()
    res.send(response)

}