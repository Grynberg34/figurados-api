const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/figurinha', adminController.definirFigurinha);

module.exports = router;
