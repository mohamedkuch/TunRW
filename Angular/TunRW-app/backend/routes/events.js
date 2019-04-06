const express = require("express");
const Event = require("../models/events");

const router = express.Router();



router.post("", (req,res,next) => {
  const post = new Event({
    title : req.body.title,
    date : req.body.date,
    adress : req.body.adress,
    description : req.body.description
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added Successfully',
      eventId: result._id
    });
  });

});

router.get('', (req, res, next) => {
  Event.find().then(documents => {
      res.status(200).json({
        message: 'Events fetched Succesfully!',
        events: documents
      });
    });

});

router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id).then(post =>{
   if(post){
      res.status(200).json(post);
   } else {
     res.status(404).json({message: 'Event not found!'});
   }

  });


});

router.put('/:id', (req, res, next) => {
  const post = new Event({
    _id: req.body.id,
    title : req.body.title,
    date : req.body.date,
    adress : req.body.adress,
    description : req.body.description
  });
  Event.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({  message : "Post updated!"});
  })
});

router.delete('/:id', (req, res, next) => {
  Event.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({  message : "Post deleted!"});
  });

});

module.exports = router;
