const express= require('express');
const path= require("path");
const bodyParser=require("body-parser");
const mongoose= require('mongoose');

const postRoutes=require('./routes/posts');
const userRoutes=require('./routes/user');

mongoose.connect("mongodb+srv://<user name>:<password>@<cluster name>.yw5pr.mongodb.net/node-angular")
.then(() => {
    console.log("Database Connected");
})
.catch(()=>{
    console.log("Connection Failure");
})


const app=express();


app.use(bodyParser.json());
app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    next();
})

app.use('/api/posts',postRoutes)
app.use('/api/users',userRoutes);

module.exports=app;
