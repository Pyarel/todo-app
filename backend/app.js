const express= require('express');
const path= require("path");
const bodyParser=require("body-parser");
const mongoose= require('mongoose');

const postRoutes=require('./routes/posts');
const userRoutes=require('./routes/user');

<<<<<<< HEAD
mongoose.connect("mongodb+srv://<user name>:<password>@<cluster name>.yw5pr.mongodb.net/node-angular")
=======
mongoose.connect("mongodb+srv://<user name>:"+process.env.MONGO_ATLAS_PW+"@cluster0.yw5pr.mongodb.net/node-angular")
>>>>>>> 1be6085 (Final Commit)
.then(() => {
    console.log("Database Connected");
})
.catch(()=>{
    console.log("Connection Failure");
})


const app=express();


app.use(bodyParser.json());
//Any request which have '/images' will be allowed to continue and fetch files.
//Since '/images' is hidden in 'backend/images' we import a path package shipped with NodeJS.
//Construct a path to "backend/images"
//This makes sure that requests targeting '/images' is forwaded to "backend/images"/
app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    next();
})

app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes);

module.exports=app;
