const express = require("express");
const Event = require("../models/events");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
}
const storage = multer.diskStorage({
  destination: (req , file , cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime Type");
    if (isValid){
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req , file , cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", checkAuth, multer({storage : storage}).single("image"),(req,res,next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Event({
    title : req.body.title,
    date : req.body.date,
    adress : req.body.adress,
    description : req.body.description,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added Successfully',
      event: {
       /*
        title: result.title,
        date: result.date,     // Equal To
        adress: result.adress,
        description: result.description,
        imagePath: result.imagePath*/
        ...result,
        id: result._id
      }
    });
  })
  .catch(err =>{
    console.log(err);
  });

});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Event.find();
  let fetchedPosts;
  if( pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.find().then(documents => {
        fetchedPosts = documents
        return Event.count();
    }).then(count =>{
      res.status(200).json({
        message: 'Events fetched Succesfully!',
        events: fetchedPosts,
        maxPosts: count
      });
    });

});

router.get('/:id', multer({storage : storage}).single("image"), (req, res, next) => {
  Event.findById(req.params.id).then(post =>{
   if(post){
      res.status(200).json(post);
   } else {
     res.status(404).json({message: 'Event not found!'});
   }

  });


});

router.put('/:id',checkAuth, multer({storage : storage}).single("image"), (req, res, next) => {
  let imageURL = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imageURL = url + "/images/" + req.file.filename;
  }
  const post = new Event({
    _id: req.body.id,
    title : req.body.title,
    date : req.body.date,
    adress : req.body.adress,
    description : req.body.description,
    imagePath : imageURL
  });
  console.log(post);
  Event.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result =>{
    if(result.nModified > 0){
      res.status(200).json({ message: "Update Successful !"});
    }else {
      res.status(401).json({  message : "Not Authorized!"});
    }
   });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Event.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({  message : "Post deleted!"});
  });

});

module.exports = router;
