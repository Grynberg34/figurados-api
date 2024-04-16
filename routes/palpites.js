const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/todos', adminController.mostrarTodasOpções);

router.get('/jogadores', adminController.mostrarJogadores);

router.get('/dia', adminController.mostrarFiguradoDia);

module.exports = router;
