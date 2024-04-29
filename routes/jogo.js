const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/todos', adminController.mostrarTodasOpções);

router.get('/jogadores', adminController.mostrarJogadores);

router.post('/figurado', adminController.mostrarFigurado);

router.get('/numero', adminController.mostrarFiguradoDia);

router.post('/palpite', adminController.checarPalpite);

router.post('/chute', adminController.checarChute);

router.post('/album', adminController.mostrarFigurados);

module.exports = router;
