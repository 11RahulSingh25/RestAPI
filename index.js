const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log("dbConnection success"))
 .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);


app.listen(3000, () => {
    console.log("Server is running");
})