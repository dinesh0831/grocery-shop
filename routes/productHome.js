const router=require("express").Router();
  const product=require("../module/productHome")

router.get("/",product.getProduct)

module.exports=router