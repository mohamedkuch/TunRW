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
        expiresIn: 3600
      });

    }).catch (err => {
      return res.status(401).json({
        message: 'Login failed'
      });
    })

});
router.get('', checkAuth, (req, res, next) => {
  const postQuery = User.find();
  let fetchedMembers;
  postQuery.find().then(documents => {
        fetchedMembers = documents
        return User.count();
    }).then(count =>{
      res.status(200).json({
        message: 'Members fetched Succesfully!',
        users: fetchedMembers,
        maxPosts: count
      });
    });

});
module.exports = router;
