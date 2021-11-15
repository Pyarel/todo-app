//Import multer
const multer = require("multer");

const MIME_TYPE_MAP= {
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

//Configuration for multer.
//Specify the destination of where the files should be stored.
const storage=multer.diskStorage({
//We can set two keys for diskStorage. One is destination.
//Destination is a function which will be executed whenever multer tries to save a file it detected.
//It takes request object, file which it extracted and callback function as paramters
  destination:(req,file,cb)=> {
    //Another level of checking if the file mime type is valid.
      const isValid= MIME_TYPE_MAP[file.mimetype];
      let error= new Error("Invalid MIME Type");
      if(isValid){
          error=null;
      }
      // We call the callback function and pass first argument whether we detected any error
      //Second argument is the string with the path where it should be stored. This path is relative to server.js file.
      //If mime type is invalid we set error. Else error is null.
      cb(error,"backend/images/");
  },
  //We can tell multer what the file name should be.

  filename:(req,file,cb) =>{
    //Get the name. Spilt the whitespaces and join them by _
      const name=file.originalname.toLowerCase().split(' ').join('_');
      //Get the mime type
      const ext=MIME_TYPE_MAP[file.mimetype];

      cb(null,name+'-'+Date.now()+'.'+ext);
  }
});
module.exports=multer({storage:storage}).single("image")
