const router=require("express").Router();
const userModel=require("./../models/user_model");
const bcrypt=require("bcrypt");
const cartModel=require("./../models/cart_model");
const cartItemModel=require("./../models/cart_item_model");
const jsonwebtoken=require("jsonwebtoken");
const jwt=require("./../middlewares/jwt");



router.post("/createaccount",async function(req,res){
   const userData=req.body;
   //Encrypt the password
   const password=userData.password;
   const salt=await bcrypt.genSalt(10);
   const hashedPassword=await bcrypt.hash(password,salt);
   userData.password=hashedPassword;

   //create the JWT token

   const token=await jsonwebtoken.sign({userId:userData.userId},"thisismysecretkeys");



  userData.token=token;
   const newUser=userModel(userData);
   await newUser.save(function(err){
      if(err){
         res.json({success:false,error:err});
         return;
      }
      res.json({success:true,data:newUser});
   });
});


router.post("/login",async function(req,res){
   const email=req.body.email;
   const password=req.body.password;

   const foundUser=await userModel.findOne({email:email});
   if(!foundUser){
      res.json({success:false,error:"user-not-found"});
      return;
   };
   const correctPassword=await bcrypt.compare(password,foundUser.password);
   if(!correctPassword){
      res.json({success:false,error:"password-wrong"});
      return;

   };
   res.json({success:true,data:foundUser});



   

});

router.get("/:userId",jwt,async function(req,res){
   const userId=req.params.userId;
   const foundUser=await userModel.findOne({userId:userId});
   if(!foundUser){
      res.json({success:false,error:"user-not-found"});
      return;
   }
   res.json({success:true,data:foundUser});
});


router.put("/",async function(req,res){
   const userData=req.body;
   const userId=req.body.userId;

   const result=await userModel.findOneAndUpdate({userId:userId},userData);
   if(!result){
      res.json({success:false,error:"user-not-defined"});
      return;
   }
   res.json({success:true,data:userData});
});

router.post("/:userId/addtocart",async function(req,res){
   const userId=req.params.userId;
   const cartItemDetails=req.body;
   

   const foundCart=await cartModel.findOne({userId:userId});
   if(!foundCart){
     const newCartModel= cartModel({userId:userId,items:[]});
     await newCartModel.save(function(err){
      if(err){
         res.json({success:false,error:err});
         return;
      }


     });
     
     cartItemDetails.cartId=newCartModel.cartId;

   
   }

   else{
     
      cartItemDetails.cartId=foundCart.cartId;
   }

   
   const newCartItem=cartItemModel(cartItemDetails);
   await newCartItem.save(async function(err){
      if(err){
         res.json({success:false,error:err});
         return;
      }
      await cartModel.findOneAndUpdate({cartId:newCartItem.cartId},{$push:{items:newCartItem._id}})
      res.json({success:true,data:newCartItem});
   });

});


router.get("/:userId/viewcart",async function(req,res){
   const userId=req.params.userId;
   const foundCart=await cartModel.findOne({userId:userId}).populate({
      path:"items",
      populate:{
         path:"product style"

      }
   });
   if(!foundCart){
      res.json({success:false,error:"cart-not-found"});
      return;
   }
   res.json({success:true,data:foundCart});
});

router.delete("/:userId/removefromcart",async function(req,res){
   const userId=req.params.userId;
   const cartItemDetails=req.body;

   const updatedCart=await cartModel.findOneAndUpdate({userId:userId},{$pull:{items:cartItemDetails.itemId}});
   if(!updatedCart){
      res.json({success:false,error:"cart-not-exists"});
      return;
   }
   res.json({success:true,data:cartItemDetails});
})

router.put("/updatequantity",async function(req,res){
   const cartItemId=req.body.id;
   const quantity=req.body.quantity;
   const updatedQuantity=await cartItemModel.findOneAndUpdate({cartItemId:cartItemId},{quantity:quantity});
   if(!updatedQuantity){
      res.json({success:false,error:"item-not-exists"});
      return;
   }
   res.json({success:true,data:updatedQuantity});
})





module.exports=router;