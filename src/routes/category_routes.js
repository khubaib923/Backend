const router=require("express").Router();
const categoryModel=require("./../models/category_model");


router.post("/",async function(req,res){
       const categoryData=req.body;
       const newCategory=categoryModel(categoryData);
       await newCategory.save(function(err){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:newCategory});

       });
});

router.delete("/",async function(req,res){
    const categoryId=req.body.categoryId;
   const result= await categoryModel.findOneAndDelete({categoryId:categoryId});
   if(!result){
    res.json({success:false,error:"category not found"});
    return;
   }
   res.json({success:true,data:result});


});

router.get("/",async function(req,res){
       await  categoryModel.find().exec(function(err,categories){
        if(err){
            res.json({success:false,error:err});
            return;
        }
        res.json({success:true,data:categories});
    })
});


router.put("/:categoryId",async function(req,res){
    const categoryId=req.params.categoryId;
    const categoryData=req.body;

    const result=await categoryModel.findOneAndUpdate({categoryId:categoryId},categoryData);
    if(!result){
        res.json({success:false,error:"category-not-found"});
        return;
    }
    res.json({success:true,data:categoryData});

})




module.exports=router;