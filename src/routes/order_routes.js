const router=require("express").Router();
const orderModel=require("./../models/order_model");


router.post("/",async function(req,res){
    const orderData=req.body;
    const newOrder=orderModel(orderData);
    await newOrder.save(function(err){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:newOrder});
    });
});

router.get("/:id",async function(req,res){
    const id=req.params.id;
    await orderModel.find({userId:id}).populate("userId").exec(function(err,docs){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:docs});
    })
});


router.put("/updatestatus",async function(req,res){
    const orderData=req.body;

    const updateOrder=await orderModel.findOneAndUpdate({orderId:orderData.orderId},{status:orderData.status});
    if(!updateOrder){
        res.json({success:false,error:"order-not-found"});
        return;
    }
    res.json({success:true,data:orderData});
})




module.exports=router;