const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {extended:false}
));
app.use(express.static("uploads"));
mongoose.connect("mongodb+srv://khubaib786:khubaib123@cluster0.zznjzwf.mongodb.net/ecommercedb").then(function(){

app.get("/",function(req,res){
    res.send("Ecommerce Application");
});

const userRoute=require("./routes/user_routes");
app.use("/api/user",userRoute);

const productRoute=require("./routes/product_routes");
app.use("/api/product",productRoute);

const categoryRoute=require("./routes/category_routes");
app.use("/api/category",categoryRoute);

const fileRoute=require("./routes/file_route");
app.use("/api/file",fileRoute);

const orderRoute=require("./routes/order_routes");
app.use("/api/order",orderRoute);


});


const Port=5000;
app.listen(Port,function(req,res){
    console.log(`The route at the server:${Port}`);
});


