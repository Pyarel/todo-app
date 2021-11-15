const express = require("express");

const { route } = require("../app");

const PostController=require("../controllers/posts")

const checkAuth=require("../middleware/check-auth");

const router = express.Router();

const extractFile=require("../middleware/file")

router.get('',PostController.getPosts);

//We will pass another function i.e multer and the configuration.
//We will call the single method and try to extract a single file with image property.
router.post('',checkAuth,extractFile,PostController.createPost);

//Extract the image using multer
router.put('/:id',checkAuth,extractFile,PostController.updatedPost);

router.get('/:id',PostController.getPost);

router.delete('/:id',checkAuth,PostController.deletePost)

module.exports=router;
