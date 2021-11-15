const Post= require('../models/post');

exports.createPost=(req,res,next)=>{
  const url=req.protocol + '://'+ req.get('host');
  const post=new Post({
      title:req.body.title,
      content:req.body.content,
      imagePath:url+'/images/'+req.file.filename,
      creator:req.userData.userId
  });
  post.save().then(result =>{
      res.status(201).json({
          message:'Post added successfully',
          post:{
              ...result,
              id:result._id
          }
      })
  }).catch(error=>{
    res.status(500).json({
      message:"Creating a post failed!"
    })
  });

}

exports.updatedPost=(req,res,next) => {
  //If we do not edit image, then the imagePath we will get from request body.
    let imagePath=req.body.imagePath;
    //If the file exists i.e if a new image was uploaded while edit
    if(req.file){
        const url=req.protocol + '://'+ req.get('host');
        imagePath:url+'/images/'+req.file.filename
    }
    const post = new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        imagePath:imagePath,
        creator:req.userData.userId
    })
    Post.updateOne({_id:req.params.id,creator:req.userData.userId},post).then(result => {
      if(result.n>0){
        res.status(200).json({
          message:'Post updated successfully'
        })
      }else{
        res.status(401).json({
          message:'Not Authorized'
        })
      }

    }).catch(error=>{
      res.status(500).json({
        message:"Couldn't edit post"
      })
    })
}

exports.deletePost=(req,res,next)=>{
  Post.deleteOne({
      _id:req.params.id,
      creator:req.userData.userId
  }).then(result =>{
    if(result.n>0){
     res.status(200).json({
       message:'Post deleted successfully'
     })
    }else{
     res.status(401).json({
       message:'Not Authorized'
     })
    }

  }).catch(error=>{
   res.status(500).json({
     message:"Couldn't delete post"
   })
 })
}

exports.getPosts=(req,res,next)=>{
  //Defining the query params
  //Plus sign to convert the query params to numeric
    const pageSize= +req.query.pagesize;
    const currentPage= +req.query.page;
    let fetchedPosts;
    const postQuery=Post.find()
    // If the query parameters exists then...
    if(pageSize && currentPage){
      //Limit the no of items to pagesize.
      //This query will still be executed on all elements in the DB
        postQuery.skip(pageSize*(currentPage-1)).limit(pageSize);
    }
    //Get the count of posts
    postQuery.then(documents => {
        fetchedPosts=documents
       return Post.count();
    }).then(count=>{
        res.json({
            message:'Post fetched successfully',
            posts:fetchedPosts,
            maxCount:count
        })

    }).catch(error=>{
      res.status(500).json({
        message:"Couldn't fetch posts"
      })
    })

}

exports.getPost=(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
      if(post){
          res.status(200).json(post);
      }
      else{
          res.status(404).json({message:'Post not found'});
      }
  }).catch(error=>{
    res.status(500).json({
      message:"Couldn't fetch post"
    })
  })
}
