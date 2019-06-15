const express = require("express");
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const eventController = require("../controller/events");
const router = express.Router();

router.post("", checkAuth, extractFile,eventController.createEvent);

router.get('', eventController.getAllEvents);

router.get('/:id', extractFile, eventController.getOneEvent);

router.put('/:id', extractFile, eventController.updateEvent);

router.delete('/:id', eventController.deleteEvent);

module.exports = router;
