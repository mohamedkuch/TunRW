const express = require("express");
const checkAuth = require('../middleware/check-auth');
const quoteController = require("../controller/quote");
const router = express.Router();

router.post("", checkAuth,quoteController.createQuote);

router.get('', quoteController.getAllQuotes);

router.get('/:id',  quoteController.getOneQoute);

router.put('/:id',  quoteController.updateQuote);

router.delete('/:id', quoteController.deleteQuote);

module.exports = router;
