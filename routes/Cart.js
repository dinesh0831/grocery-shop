
var Cart=require("../module/Cart.service")
var router = require('express').Router();
router.patch("/:user",Cart.postCart);
router.get("/:byuser",Cart.getCart)
router.patch("/edit/:editCart",Cart.removeItem)

module.exports=router