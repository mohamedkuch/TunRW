const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST , PATCH , DELETE , OPTIONS");
  next();

});

app.use('/api/events', (req, res, next) => {
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
