const {Schema,model}=require("mongoose");
const productStyleModel=require("./product_style_model");

const productSchema=Schema({
    productId:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    category:{type:Schema.Types.ObjectId, ref:"category"},
    description:{type:String,default:""},
    styles:{type:[{type:Schema.Types.ObjectId,ref:"productStyle"}],default:[]},
    // price:{type:Array,default:""},
    // images:{type:Array,default:""},
    addedOn:{type:Date,default:Date.now}

});

const productModel=model("product",productSchema);

module.exports=productModel;
