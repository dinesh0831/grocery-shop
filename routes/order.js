var express = require('express');
var order=require("../module/order.service")
var router = express.Router();
router.post("/",order.postOrder);
router.get("/getOrder",order.getById);
router.post("/razorPay",order.razorPay)
module.exports=router