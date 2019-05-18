const express = require("express");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("/signup", checkAuth, (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      const user = new User({
        username: req.body.username,
        password: hash
      });
      user.save()
        .then(result =>{
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err =>{
          res.status(500).json({
            error: err
          });
        });
    });


});
router.post("/login", (req, res, next) =>{
  let fetchedUser;
  User.findOne({username: req.body.username })
    .then(user =>{
      if(!user) {
        return res.status(401).json({
          message: 'Login failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    }).then ( result => {
      if(!result){
        return res.status(401).json({
          message: 'Login failed , password is incorrect'
        });
      }
      const token = jwt.sign({username: fetchedUser.username, userId: fetchedUser._id},
         'TunRW_Funcheta_Studio_komos_nikos',
         {expiresIn: '1h' }
         );
      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        id: fetchedUser._id,
        username: fetchedUser.username,
        name: fetchedUser.name
      });

    }).catch (err => {
      return res.status(401).json({
        message: 'Login failed'
      });
    })

});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = User.find();
  let fetchedPosts;
  if( pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.find().then(documents => {
        fetchedPosts = documents
        return User.count();
    }).then(count =>{
      res.status(200).json({
        message: 'Members fetched Succesfully!',
        users: fetchedPosts,
        maxPosts: count
      });
    });

});


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id).then(userData =>{
   if(userData){
      res.status(200).json(userData);
   } else {
     res.status(404).json({message: 'Event not found!'});
   }

  });


});
module.exports = router;
