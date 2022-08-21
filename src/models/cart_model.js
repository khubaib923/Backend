const {Schema,model}=require("mongoose");
const uuid=require("uuid");

const cartSchema=Schema({
    cartId:{type:String,default:uuid.v1()},
    userId:{type:String,required:true},
    items:{type:[{type:Schema.Types.ObjectId,ref:"cartItem"}],default:[]}


});

const cartModel=model("cart",cartSchema);

module.exports=cartModel;