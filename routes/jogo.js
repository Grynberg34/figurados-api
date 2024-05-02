const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/todos', adminController.checarToken, adminController.mostrarTodasOpções);

router.get('/jogadores', adminController.checarToken, adminController.mostrarJogadores);

router.post('/figurado', adminController.checarToken, adminController.mostrarFigurado);

router.get('/numero', adminController.checarToken, adminController.mostrarFiguradoDia);

router.post('/palpite', adminController.checarToken, adminController.checarPalpite);

router.post('/chute', adminController.checarToken, adminController.checarChute);

router.post('/album', adminController.checarToken, adminController.mostrarFigurados);

module.exports = router;
