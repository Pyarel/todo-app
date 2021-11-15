//Create a function to parse the incoming request and check if the user has a valid token or not.
const jwt = require("jsonwebtoken");


//Export the middleware
//It takes a request object, response object which allows us to create the response.
//Next which we call if the request should be allowed to continue.
module.exports= (req,res,next)=>{
  //Execute if token exists
    try{
    //Check the request header for authorization header where we attach authorization information.
    //Since tokens have a pattern 'Bearer isakjdhlaskadlsa'. The first part is a convention in some API. So we use spilt to choose the second part of the string
    const token = req.headers.authorization.split(" ")[1];
    //Verify if the token is valid. Pass the Secret string to the verify method.
    const decodedToken=jwt.verify(token,process.env.JWT_KEY)
    req.userData={email:decodedToken.email,userId:decodedToken.userId};
    //If the verification fails, control goes to the catch block
    //Else continue the execution
    next();
    }
    catch(err){
      res.status(401).json({message:"You are not authenticated!"})
    }
}
