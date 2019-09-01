const express = require("express");
const checkAuth = require('../middleware/check-auth');
const notificationController = require("../controller/notifications");
const router = express.Router();


router.get('', checkAuth, notificationController.getAllNotifications);
router.delete('', notificationController.deleteNotifications);
router.put('/:id', checkAuth, notificationController.updateNotification);

module.exports = router;
