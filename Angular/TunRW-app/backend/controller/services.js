const Service = require("../models/services");

exports.createService = (req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Service({
      title : req.body.title,
      description : req.body.description,
      creator: req.userData.userId
    });
    console.log(post);
    post.save().then(result => {
      res.status(201).json({
        message: 'Post added Successfully',
        serive: {
          ...result,
          id: result._id
        }
      });
    })
    .catch(err =>{
      res.status(500).json({
        message : "Creating Service Failed!"
      });
      console.log("zaab ", err);

    });
  }
  exports.getAllServices = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Service.find();
    let fetchedPosts;
    if( pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery.find().then(documents => {
          fetchedPosts = documents
          return Service.count();
      }).then(count =>{
        res.status(200).json({
          message: 'Services fetched Succesfully!',
          services: fetchedPosts,
          maxPosts: count
        });
      }).catch(error => {
        res.status(500).json({
          message : "Services fetching Failed!"
        });
      });
  
  }
  exports.getOneService= (req, res, next) => {
    Service.findById(req.params.id).then(post =>{
     if(post){
        res.status(200).json(post);
     } else {
       res.status(404).json({message: 'Service not found!'});
     }
  
    });
  }

  exports.updateService = (req, res, next) => {
    const post = new Service({
      _id: req.body.id,
      title : req.body.title,
      description : req.body.description,
      creator: req.body.userId
    });
    console.log(post);
    Service.updateOne( post).then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Update Successful !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
     }).catch(error => {
      res.status(500).json({
        message : "Update Service Failed!"
      });
    });
  }

  exports.deleteService = (req, res, next) => {
    Service.deleteOne().then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Service Deleted !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
    }).catch(error => {
      res.status(500).json({
        message : "Deleting Service Failed!"
      });
    });
  
  }