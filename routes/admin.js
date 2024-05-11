const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/figurado', adminController.definirFigurado);

router.post('/certo', adminController.definirCertoFigurado);

module.exports = router;
