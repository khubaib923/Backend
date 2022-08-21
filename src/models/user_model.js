const {Schema,model}=require("mongoose");

const userSchema=Schema({
    userId:{type:String,unique:true},
    fullName:{type:String,default:""},
    email:{type:String,unique:true},
    phone:{type:String,unique:true},
    password:{type:String},
    address:{type:String,default:""},
    country:{type:String,default:""},
    city:{type:String,default:""},
    pincode:{type:String,default:""},
    token:{type:String,default:""},
    addedOn:{type:Date,default:Date.now},

});


const userModel=model("user",userSchema);



module.exports=userModel;