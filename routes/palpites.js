const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/todos', adminController.mostrarTodasOpções);

router.get('/jogadores', adminController.mostrarJogadores);

router.get('/dia/:id', adminController.mostrarFigurado);

router.get('/numero', adminController.mostrarFiguradoDia);

module.exports = router;
