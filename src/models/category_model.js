const {Schema,model}=require("mongoose");

const categorySchema=Schema({
    categoryId:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    addedOn:{type:Date,default:Date.now}

});

const categoryModel=model("category",categorySchema);

module.exports=categoryModel; 