const Event = require("../models/events");

exports.createEvent = (req,res,next) => {
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
      res.status(500).json({
        message : "Creating Event Failed!"
      });
    });
  }
  exports.getAllEvents = (req, res, next) => {
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
  
  }
  exports.getOneEvent = (req, res, next) => {
    Event.findById(req.params.id).then(post =>{
     if(post){
        res.status(200).json(post);
     } else {
       res.status(404).json({message: 'Event not found!'});
     }
  
    });
  }

  exports.updateEvent = (req, res, next) => {
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
      imagePath : imageURL,
      creator: req.userData.userId
    });
    console.log(post);
    Event.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Update Successful !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
     }).catch(error => {
      res.status(500).json({
        message : "Update Event Failed!"
      });
    });
  }

  exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({_id:req.params.id, creator: req.userData.userId}).then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Event Deleted !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
    }).catch(error => {
      res.status(500).json({
        message : "Deleting Event Failed!"
      });
    });
  
  }