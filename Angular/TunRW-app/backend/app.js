const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Event = require("./models/events");


const app = express();

mongoose.connect("mongodb+srv://Mohamed:Ckq8Ve7JLxDnLXCY@tunrwcluster-nwi9h.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Database !');
  })
  .catch(() => {
    console.log('Connection Failed !');
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST , PATCH , DELETE , OPTIONS");
  next();

});
// user mdp = Ckq8Ve7JLxDnLXCY

app.post("/api/events", (req,res,next) => {
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

app.get('/api/events', (req, res, next) => {
  Event.find().then(documents => {
      res.status(200).json({
        message: 'Events fetched Succesfully!',
        events: documents
      });
    });

});


app.delete('/api/events/:id', (req, res, next) => {
  Event.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({  message : "Post deleted!"});
  });

});

module.exports = app;
