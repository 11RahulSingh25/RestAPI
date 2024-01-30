const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();
const Cart = require("../models/Cart");

// CREATE CART

router.post("/",verifyToken,async(req,res)=>{
  const newCart = new Cart(req.body)

  try{
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }
  catch{
    res.status(500).json(err);
      console.log(err);
  }
})


//UPDATE CART

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

   try {
      const updatedCart = await Cart.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body 
         },
         { new: true }
      );
      res.status(200).json(updatedCart);
   }
   catch (err) {
      res.status(500).json(err);
      console.log(err);
   }
});

//DELETE Cart

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
   try {
      await Cart.findByIdAndDelete(req.params.id)
      res.status(200).json("Cart has been deleted..");
   } catch (err) {
      res.status(500).json(err);
   }
});

// GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
   try {
      const cart = await Cart.findOne({userId : req.params.userId});
      res.status(200).json(cart);
   } catch (err) {
      res.status(500).json(err);
      console.log(err);
   }
});

// GET ALL CART
router.get("/", async (req, res) => {
   try {
      const carts = Cart.find();
      res.status(200).json(carts);
    }
    catch (err) {
      res.status(500).json(err);
      console.log(err);
   }
});


module.exports = router;