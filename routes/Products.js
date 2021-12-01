var express = require('express');
var router = express.Router();
var products=require("../module/product.service")
var multer=require("multer")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"cover")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
});
const upload=multer({storage}).single("file")

router.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })
})

/* GET home page. */
router.post ("/",products.productPost)
router.get("/",products.getProduct)
router.patch("/:id",products.productUpdate)

module.exports = router;
