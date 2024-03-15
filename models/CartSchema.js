const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    cid: {
        type: String,
        required: true,
    },
    pid: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
