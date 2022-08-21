const {Schema,model}=require("mongoose");
const uuid=require("uuid");

const orderSchema=Schema({

    orderId:{type:String,default:uuid.v1},
    userId:{type:Schema.Types.ObjectId,ref:"user"},
    items:{type:Array,default:[]},
    status:{type:Number,default:0},
    addedOn:{type:Date,default:Date.now}


});

const orderModel=model("order",orderSchema);

module.exports=orderModel;