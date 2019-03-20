const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Event = require("./models/events");


const app = express();

mongoose.connect("mongodb+srv://Mohamed:Ckq8Ve7JLxDnLXCY@tunrwcluster-nwi9h.mongodb.net/test?retryWrites=true")
  .then(() => {
    console.log('Connected to Database !');
  })
  .catch(() => {
    console.log('Connection Failed !');
  });


app.use(bodyParser.json());

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
  console.log(post);
  res.status(201).json({
    message: 'Post added Successfully'
  });
});

app.get('/api/events', (req, res, next) => {
  const events = [
    {
             id: "100",
          title: "First Title",
           date: "date",
         adress: "adress",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor"
    },

    {
             id: "200",
          title: "Second Title",
           date: "date",
         adress: "adress",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor"
    },
    {
              id: "300",
          title: "Third Title",
            date: "datase",
          adress: "adressdas",
        description: "Lorem sd ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor"
    }


  ];
  res.status(200).json({
    message: 'Events fetched Succesfully!',
    events: events
  });
});

module.exports = app;
