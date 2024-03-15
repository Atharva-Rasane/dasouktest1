const express = require('express');
const { SignIn, SignUp , getData,shippingDetails} = require('../controllers/userController');
const router = express.Router();
const Cart = require("../models/CartSchema")


router.post('/login',SignIn);
router.post('/register',SignUp);
// router.get("/getdata",getData)
// router.post("/shipping", shippingDetails);

router.post("/addtocart",async (req, res) => {
    if(req.session.authencated){
        try {
            const existingItem = await Cart.findOne({cid: req.session.user._id,pid:req.body.pid});
            if(existingItem){
                return res.status(400).json({message:"Item Already Present"})
            }
            const result = await Cart.create({
                cid: req.session.user._id,
                pid: req.body.pid,
                quantity: 1
            })

            return res.status(201).json({message:"Added to Cart"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Something went wrong"})
        }
    }else{
        return res.redirect("/login")
    }
    // res.send("WOOW")
})

module.exports = router;