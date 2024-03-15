const express = require("express");
const router = express.Router();
const passport = require("passport");
const products = require("../models/ProductSchema");
const Cart = require("../models/CartSchema")
const connectDB = require("../db/conn");
const config = require("../data.json")

router.get("/", async (req, res) => {
  console.log("USER::: ", req.session)
  const productS = await products.find({sid:config.sid});
  res.render("index.ejs", {products:productS});
});

router.get("/blog", (req, res) => {
  res.render("blog.ejs");
});

router.get("/cart", async (req, res) => {
  const productS = await products.find({sid:config.sid});
  const CartS = await Cart.find({cid:"65eb4cb0f72268ed302fe9ef"});
  console.log(productS,CartS,productS.filter(el => el._id == CartS[0].pid)[0]._id)
  // const CartS = 1;
  res.render("cart.ejs", {products:productS, cart:CartS});
});

router.get("/category", (req, res) => {
  res.render("category.ejs");
});

router.get("/checkout", (req, res) => {
  res.render("checkout.ejs");
});

router.get("/confirmation", (req, res) => {
  res.render("confirmation.ejs");
});

router.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.get("/single-blog", (req, res) => {
  res.render("single-blog.ejs");
});

router.get("/product", async (req, res) => {
  try {
    // Fetch product data from MongoDB
     
    const product = await products.findOne({_id:req.query.pid});
     if (!product) {
       return res.status(404).send("Product not found");
     }
    console.log(product)

    // Render product.ejs template and pass product data
    res.render("single-product.ejs", { product:product });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/track-order", (req, res) => {
  res.render("tracking-order.ejs");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/google/callback", (req, res) => {
  res.send("Authenticated");
});

module.exports = router;
