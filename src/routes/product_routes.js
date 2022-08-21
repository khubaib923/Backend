const router=require("express").Router();
const productModel=require("./../models/product_model");
const productStyleModel=require("./../models/product_style_model");



router.get("/",async function(req,res){
    productModel.find().populate("category styles").exec(function(err,products){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:products});

    })
})


router.post("/",async function(req,res){
    const productData=req.body;
    const styleIds=[];
    productData.styles.forEach(async function(style){

        const newStyle=productStyleModel(style);
        styleIds.push(newStyle._id);
        await newStyle.save(function(err){
            if(err){
                res.json({success:false,error:err});
                return;
            }
        })
     



    });

    productData.styles=styleIds;



    const newProduct=productModel(productData);
    await newProduct.save(function(err){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:newProduct});
    })
});

router.delete("/",async function(req,res){
    const productId=req.body.productId;
   const result=await productModel.findOneAndDelete({productId:productId});
   if(!result){
    res.json({success:false,error:"product-not-found"});
    return;
   }
   res.json({success:true,data:result});

});


router.put("/",async function(req,res){
    const producData=req.body;
    const productId=producData.productId;

    const result=await productModel.findOneAndUpdate({productId:productId},producData);

    if(!result){
        res.json({success:false,error:"product-not-found"});
        return;
    }
    res.json({success:true,data:producData});
})



module.exports=router;