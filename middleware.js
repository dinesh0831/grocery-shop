const jwt = require("jsonwebtoken")

   exports.authtoken= async(req, res, next) =>{
    const token =await req.headers["clone"]
    console.log(req.headers["clone"])
    if (token) {
            try {
                req.user= await jwt.verify(token, process.env.authkey)
                console.log(req.user)
                 next()
            }
            catch (error) {
                res.send(error)
            }
        }
        else {
            res.sendStatus(401)
        }
    }
       