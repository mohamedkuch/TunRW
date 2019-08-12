const express = require("express");
const checkAuth = require('../middleware/check-auth');
const serviceController = require("../controller/services");
const router = express.Router();

router.post("", checkAuth, serviceController.createService);

router.get('', serviceController.getAllServices);

router.get('/:id',  serviceController.getOneService);

router.put('/:id',  serviceController.updateService);

router.delete('/:id', serviceController.deleteService);

module.exports = router;
