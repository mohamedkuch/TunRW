const Project = require("../models/projects");

exports.createProject = (req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Project({
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
        project: {
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
        message : "Creating Project Failed!"
      });
    });
  }
  exports.getAllProjects = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Project.find();
    let fetchedPosts;
    if( pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery.find().then(documents => {
          fetchedPosts = documents
          return Project.count();
      }).then(count =>{
        res.status(200).json({
          message: 'Projects fetched Succesfully!',
          projects: fetchedPosts,
          maxPosts: count
        });
      });
  
  }
  exports.getOneProject = (req, res, next) => {
    Project.findById(req.params.id).then(post =>{
     if(post){
        res.status(200).json(post);
     } else {
       res.status(404).json({message: 'Project not found!'});
     }
  
    });
  }

  exports.updateProject = (req, res, next) => {
    let imageURL = req.body.imagePath;
    if(req.file){
      const url = req.protocol + '://' + req.get("host");
      imageURL = url + "/images/" + req.file.filename;
    }
    const post = new Project({
      _id: req.body.id,
      title : req.body.title,
      date : req.body.date,
      adress : req.body.adress,
      description : req.body.description,
      imagePath : imageURL,
      creator: req.body.userId
    });
    console.log(post);
    Project.updateOne( post).then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Update Successful !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
     }).catch(error => {
      res.status(500).json({
        message : "Update Project Failed!"
      });
    });
  }

  exports.deleteProject = (req, res, next) => {
    Project.deleteOne().then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Project Deleted !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
    }).catch(error => {
      res.status(500).json({
        message : "Deleting Project Failed!"
      });
    });
  
  }