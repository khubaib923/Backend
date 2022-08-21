const multer=require("multer");
const uuid =require("uuid");


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads"); //path defined eg:"uploads"
    },
    filename:function(req,file,cb){
      
       const originalName=file.originalname;
       const nameArray=originalName.split("."); //file.png
       const extension=nameArray[nameArray.length-1];
       const newFileName=uuid.v1() + "." + extension;
         cb(null,newFileName);

    },
});


const upload=multer({   //Middleware
    storage:storage
});

module.exports=upload;