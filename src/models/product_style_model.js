const {Schema,model}=require("mongoose");

const productStyleSchema=Schema({
    styleId:{type:String,required:true,unique:true },
    title:{type:String,required:true},
    price:{type:Number,required:true},
    images:{type:Array,required:true},
});

const productStyleModel=model("productStyle",productStyleSchema);

module.exports=productStyleModel;