const express = require("express");
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const partnersController = require("../controller/partners");
const router = express.Router();

router.post('', checkAuth, extractFile, partnersController.createPartner);

router.get('', partnersController.getAllPartners);

router.get('/:id', extractFile, partnersController.getOnePartner);

router.put('/:id', extractFile, partnersController.updatePartner);

router.delete('/:id', partnersController.deletePartner);

module.exports = router;
