const express = require('express');

const app = express();


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
    }

  ];
  res.status(200).json({
    message: 'Events fetched Succesfully!',
    events: events
  });
});

module.exports = app;
