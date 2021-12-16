
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Userlist = require("../schema/userScmema");
const { registerSchema, logginSchema, resetSchema } = require("../schema/userValidation");
const Cart = require("../schema/cartSchema")

const mailgun = require("mailgun-js");
const DOMAIN = process.env.mailgunDomain;
const mg = mailgun({ apiKey: "9c4f011d75636f1882b03923dd7377af-7dcc6512-9c463b8e", domain: DOMAIN });

const UserService = {
    async registerVerification(req, res) {
        try {
            // validation
            let { email, mobileno, name, address, password } = req.body
            let { error } = await registerSchema.validate(req.body);
            if (error) {
                return res.send({ message: "*validation failed", error })
            }
            // check the email existing or not
            await Userlist.findOne({ email: email }).exec(async (err, user) => {
                if (user) {
                    return res.send({ message: "*User already exist" });
                }
                // password bcrypt
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt)
                const token = await jwt.sign({ email, mobileno, name, address, password }, process.env.authkey, { expiresIn: "30m" })
                const data = {
                    from: ' groceryshop@order.com',
                    to: email,
                    subject: 'Email Verification',
                    html: `
                    <h2>Please click on given link to activate your account</h2>
                    <p>${process.env.frontend}/email_verification/${token} </p>`
                };
                mg.messages().send(data, function (error, body) {
                    if (error) {
                        res.send({
                            error: "error on senting mail"
                        })
                    }
                    res.send({ message: "Email has been sent to your registered email please activate your account" })

                });


            })
        }
        catch (error) {
            res.sendStatus(500)
        }
    },
    async register(req, res) {
        try {
            // validation
            let { email, mobileno, name, address, password } = req.body

            // check the email existing or not
            await Userlist.findOne({ email: email }).exec(async (err, user) => {
                if (user) {
                    return res.send({ message: "*User already exist" });
                }
                let users = new Userlist({
                    email: email,
                    password: password,
                    name: name,
                    mobileno: mobileno,
                    address: address,
                    role: "enduser"

                });


                const response = await users.save();




                let carts = new Cart({
                    cart: [],
                    user: response._id

                })
                const cart = await carts.save()
                res.send({ cart, response })
            })

            // insert register data


        }
        catch (error) {
            res.sendStatus(500)
        }




    },
    async login(req, res) {
        try {


            // validation
            const { error } = await logginSchema.validate(req.body);
            if (error)
                return res.send({ message: "*validation failed" })


            // email is registered or not
            const user = await Userlist.findOne({ email: req.body.email }).exec()
            console.log(user)
            if (!user) return res.send({ message: "*User not exist" })



            // check the password
            const isValid = await bcrypt.compare(req.body.password, user.password)
            if (!isValid) return res.send({ message: "*email and password not matching", });



            // token for access the account
            const token = await jwt.sign({ user }, process.env.authkey, { expiresIn: "8hr" })
            console.log(token)


            // respose for logged in
            res.send({ message: "*successfully loggedIn", token })

        }
        catch (error) {
            console.log("Error", error)
            res.sendStatus(500)
        }
    },
    async forgetPassword(req, res) {
        try {
            let { email } = req.body
            const { error } = await resetSchema.validate(req.body);
            if (error)
                return res.send({ message: "*validation failed" })

            await Userlist.findOne({ email: email }).exec(async (err, user) => {
                console.log(user)

                if (!user) {
                    return res.send({ message: "*User not exist" })
                }

                const token = await jwt.sign({ email }, process.env.authkey, { expiresIn: "30m" })
                const data = {
                    from: ' groceryshop@order.com',
                    to: email,
                    subject: 'Password reset',
                    html: `
                    <h2>Please click on given link to reset your password</h2>
                    <p>${process.env.frontend}/reset/${token} </p>`
                };
                mg.messages().send(data, function (error, body) {
                    if (error) {
                        res.send({
                            error: "error on senting mail"
                        })
                    }
                    res.send({message:"Mail sent successfully"})


                });
              

            })


        }
        catch (err) {
            res.send(err)
        }
    },
    async resetPassword(req, res) {
        let { email, password, } = req.body
        const { error } = await logginSchema.validate(req.body);
        if (error)
            return res.send({ message: "*validation failed" })

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt)
        const data=await Userlist.findOneAndUpdate({ email: email }, {
            password
        }, { new: true })
       
        res.send({message:"successfully password changed"})
    }


}
module.exports = UserService
