const express = require('express');
const router = express.Router();
const lendingController = require('../controllers/lendingController');

// Lending routes
router.get('/', lendingController.getLendings);
router.post('/', lendingController.createLending);
router.put('/:id', lendingController.updateLending);
router.delete('/:id', lendingController.deleteLending);

module.exports = router;