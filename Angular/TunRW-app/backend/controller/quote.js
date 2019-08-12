const Quote = require("../models/quote");

exports.createQuote = (req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Quote({
      writer : req.body.writer,
      description : req.body.description,
      creator: req.userData.userId
    });
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
        message : "Creating Quote Failed!"
      });
    });
  }
  exports.getAllQuotes = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Quote.find();
    let fetchedPosts;
    if( pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery.find().then(documents => {
          fetchedPosts = documents
          return Quote.count();
      }).then(count =>{
        res.status(200).json({
          message: 'Quotes fetched Succesfully!',
          quotes: fetchedPosts,
          maxPosts: count
        });
      });
  
  }
  exports.getOneQoute= (req, res, next) => {
    Quote.findById(req.params.id).then(post =>{
     if(post){
        res.status(200).json(post);
     } else {
       res.status(404).json({message: 'Quote not found!'});
     }
  
    });
  }

  exports.updateQuote = (req, res, next) => {
    const post = new Quote({
      _id: req.body.id,
      writer : req.body.writer,
      description : req.body.description,
      creator: req.body.userId
    });
    console.log(post);
    Quote.updateOne( post).then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Update Successful !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
     }).catch(error => {
      res.status(500).json({
        message : "Update Quote Failed!"
      });
    });
  }

  exports.deleteQuote = (req, res, next) => {
    Quote.deleteOne().then(result =>{
      if(result.n > 0){
        res.status(200).json({ message: "Quote Deleted !"});
      }else {
        res.status(401).json({  message : "Not Authorized!"});
      }
    }).catch(error => {
      res.status(500).json({
        message : "Deleting Quote Failed!"
      });
    });
  
  }