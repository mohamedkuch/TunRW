const Partner = require("../models/partners");

exports.createPartner = (req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Partner({
      title : req.body.title,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    post.save().then(result => {
      res.status(201).json({
        message: 'Post added Successfully',
        partner: {
          ...result,
          id: result._id
        }
      });
    })
    .catch(err =>{
      res.status(500).json({
        message : "Creating Partner Failed!"
      });
    });
  }
  exports.getAllPartners = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Partner.find();
    let fetchedPosts;
    if( pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery.find().then(documents => {
          fetchedPosts = documents
          return Partner.count();
      }).then(count =>{
        res.status(200).json({
          message: 'Partners fetched Succesfully!',
          partners: fetchedPosts,
          maxPosts: count
        });
      });
  
  }
  exports.getOnePartner = (req, res, next) => {
    Partner.findById(req.params.id).then(post =>{
     if(post){
        res.status(200).json(post);
     } else {
       res.status(404).json({message: 'Partner not found!'});
     }
  
    });
  }

  exports.updatePartner = (req, res, next) => {
    let imageURL = req.body.imagePath;
    if(req.file){
      const url = req.protocol + '://' + req.get("host");
      imageURL = url + "/images/" + req.file.filename;
    }
    const post = new Partner({
      _id: req.body.id,
      title : req.body.title,
      imagePath : imageURL,
      creator: req.body.userId
    });
    console.log(post);
    Partner.updateOne({ _id: req.params.id }, post).then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Update Successful !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
     }).catch(error => {
      res.status(500).json({
        message : "Update Partner Failed!"
      });
    });
  }

  exports.deletePartner = (req, res, next) => {
    Partner.deleteOne().then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Partner Deleted !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
    }).catch(error => {
      res.status(500).json({
        message : "Deleting Partner Failed!"
      });
    });
  
  }