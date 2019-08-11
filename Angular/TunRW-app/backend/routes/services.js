const express = require("express");
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const serviceController = require("../controller/services");
const router = express.Router();

router.post("", checkAuth, extractFile,serviceController.createService);

router.get('', serviceController.getAllServicess);

router.get('/:id', extractFile, serviceController.getOneService);

router.put('/:id', extractFile, serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

module.exports = router;
