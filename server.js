const express = require("express");
const app = express();
const route = require("./routes/route");
const userRoute = require("./routes/userRoute");
const connectDB = require("./db/conn");
const bodyParser = require("body-parser");
require("./auth");
const setCommonVariables = require("./middleware");
const session = require("express-session")



const config = require("./data.json");
app.use(session({
  secret: "Some Secreat",
  cookie: {
    maxAge: 600000
  },
  saveUninitialized: false,
}));


app.use(setCommonVariables);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("", route);
app.use("", userRoute);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


connectDB().then(() => {
  app.listen(config.portnum, () => {
    console.log("server listening on port " + config.portnum);
  });
});



// RAZORPAY_KEY_ID = rzp_test_wwlSZF00l756X
// RAZORPAY_SECRET_KEY_ID = pV5grQSxnBIh4zWm69Wd48D1
