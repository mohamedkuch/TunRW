const express = require("express");
const checkAuth = require('../middleware/check-auth');
const notificationController = require("../controller/notifications");
const router = express.Router();


router.get('', notificationController.getAllNotifications);
router.delete('', notificationController.deleteNotifications);
router.put('/:id', notificationController.updateNotification);

module.exports = router;
