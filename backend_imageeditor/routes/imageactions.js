const express = require('express');
const app = express();
const multer = require('multer');  //multer is a middleware to handle file uploads
const imageSchema = require("../models/imageSchema"); 
const usersSchema = require("../models/usersSchema");
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({  //Using disk storage engine of Multer to handle file name and location
    destination:(req,file,cb)=>{
        cb(null,"./images");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    }
})

const multerfile = multer({storage:storage});

app.post('/upload',multerfile.single('image1'),async (req,res)=>{  //Adding multer as a middleware
    try {
   if(!req.file)
   {
    console.log("No file uploaded error.Select any file")
    throw new Error("File is not selected or uploaded");
   }

   const fileBuffer = fs.readFileSync(`./images/${req.file.filename}`);

//    console.log(fileBuffer,"this is the fileBuffer")

   const obj1 =new imageSchema({
    name :req.file.filename,
    imagedata : fileBuffer,
   })


//    console.log(responsefromDB)
   res.status(201).send({
    status:201,
    message:"File uploaded successfully",
    filesent : req.file, 
   })

}
catch (error) {
    console.log(error);
    res.status(400).send({
        status:400,
        message:"Unable to upload file.Error",
        errorobj : error,
    })
}
})


app.get('/getimage',async (req,res)=>{
   try {
      if(req.query.name)
      {
         let response = await imageSchema.findOne({name : req.query.name});
          let imagefileBuffer = response.imagedata;

           console.log("Fetched from DB");
          const imageFile = Buffer.from(imagefileBuffer,'base64');

        //   console.log('converted as image',imageFile);

        //   let temppath = 'D:/repos/Trikl/ImageEditorMERNStack/backend_imageeditor/tempimgstorage/tempimg.png';

          let temppath = path.resolve(__dirname,'tempimgstorage','tempimg.png');  //written to convert the 'Relative' path to 'Absolute path'

        //   console.log(temppath,"this is the temppath")


          fs.writeFileSync(temppath,imageFile);

        //   console.log("Writing file to temp folder")

          res.set('Content-Type','image/png');

          res.sendFile(temppath,(error)=>{
            fs.unlinkSync(temppath);

            if(error) {
                res.status(400).send({
                    status:400,
                    message:"Failed to send the image"
                })
            }
          })

          
      }
      else {
        throw new Error("Please send the name of Image in query");
      }
   }
   catch(error) {
    console.log(error);
    res.status(400).send({
        status:400,
        message : "Failed to get the image",
        errorobj : error,
    })
   }
})

module.exports = app;
