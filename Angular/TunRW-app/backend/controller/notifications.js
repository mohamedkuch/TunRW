const Notification = require("../models/notifications");


  exports.getAllNotifications= (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Notification.find();
    let fetchedPosts;
    if( pageSize && currentPage) {
      postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery.find().then(documents => {
          fetchedPosts = documents
          return Notification.count();
      }).then(count =>{
        res.status(200).json({
          message: 'Notifications fetched Succesfully!',
          notifications: fetchedPosts,
          maxPosts: count
        });
      });
  
  }
  exports.deleteNotifications = (req, res, next) => {

    Notification.deleteMany().then(result =>{
        if(result.n > 0){
          res.status(200).json({ message: "Notifications Deleted !"});
        }else {
          res.status(401).json({  message : "Not Authorized!"});
        }
      }).catch(error => {
        res.status(500).json({
          message : "Deleting Notifications Failed!"
        });
      });
    
  }
  exports.updateNotification = (req, res, next) => {
    Notification.findById(req.params.id).then(post =>{
        if(post){
            post.watched = true;
            Notification.updateOne({ _id: req.params.id },  post).then(result =>{
                if(result.n > 0){
                  res.status(200).json({ message: "Update Successful !"});
                }else {
                  res.status(401).json({  message : "Not Authorized!"});
                }
               }).catch(error => {
                res.status(500).json({
                  message : "Update Notification Failed!"
                });
              });

        } else {

          res.status(404).json({message: 'Notification not found!'});
        }
     
       });


    

  }