
const express = require('express');
const router = express.Router();
const { purchaseBook, getPurchasedBooks } = require('../controller/purchaseController');

router.post('/', purchaseBook);
router.get('/:userId', getPurchasedBooks);

module.exports = router;