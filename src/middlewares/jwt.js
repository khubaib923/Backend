const jsonwebtoken=require("jsonwebtoken");

async function verify(req,res,next){

  const authToken= req.headers["auth-token"] ;    //header is a map or object
  const userId=req.headers["userId"];

  try{
    const result=await jsonwebtoken.verify(authToken,"thisismysecretkeys");

  if(result.userId == userId){
    next();
  }
  else{
    res.json({success:false,error:"access-denied"});
  }
  }
catch(e){
    res.json({success:false,error:e});
}




}

module.exports=verify;
