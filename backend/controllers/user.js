const User=require("../models/user")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
exports.createdUser=(req,res,next)=>{
  //Hash method takes parameter- password and salting rounds.(The higher the number, the safer)
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user=new User({
            email: req.body.email,
            password:hash
        });
        //Save the user. Call then to handle the result
        user.save()
        .then(result=>{
            res.status(201).json({
                message:'User Created Successfully',
                result:result
            })
        })
        .catch(err=>{
           res.status(500).json({
               message:"Invalid authentication credentials!"
           })
        })
    })
}
exports.userLogin=(req,res,next)=>{
  let fetchedUser;
  //Check if the email ID exists in the DB
  User.findOne({email:req.body.email})
  .then(user=>{
      if(!user){
          return res.status(401).json({
              message:'Auth failed'
          })
      }

      fetchedUser=user;
      //Compare an input to an encrypted value. Returns true if the input generates same hash when encrypted.
      return bcrypt.compare(req.body.password,user.password);
  })
      .then(result=>{

          if(!result){

              return res.status(401).json({
                  message:'Auth failed'
              })
          }
          //Sign method create a JSON web token
          //First argument is the payload which can be string or object
          //Second argument is the secret key
          //Optional-expiresIn-define how long the token should last
          const token=jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},process.env.JWT_KEY,
          {expiresIn:"1h"}
          );
          res.status(200).json({
              token:token,
              expiresIn:3600,
              userId:fetchedUser._id
          })

      })
      .catch(err=>{

          return res.status(401).json({
              message:'Invalid authentication credentials!'
          })
      })
}
