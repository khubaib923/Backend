const {Schema,model}=require("mongoose");
const uuid=require("uuid");

const cartItemSchema=Schema({
    cartItemId:{type:String,default:uuid.v1()},
    cartId:{type:String,required:true},
    product:{type:Schema.Types.ObjectId,ref:"product"},
    style:{type:Schema.Types.ObjectId,ref:"productStyle"},
    quantity:{type:Number,default:1},
    addedOn:{type:Date,default:Date.now}

});


const cartItemModel=model("cartItem",cartItemSchema);

module.exports=cartItemModel;