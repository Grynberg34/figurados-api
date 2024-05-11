const jwt = require('jsonwebtoken');
const Figurado = require('../models/Figurado');
const PalpiteUser = require('../models/PalpiteUser');
const Palpite = require('../models/Palpite');
const Certo = require('../models/Certo');
const Chute = require('../models/Chute');
require("dotenv").config()

let jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports= {
    definirFigurado: async function (req,res) {
        let token = req.header('authorization').substr(7);
        let id = req.body.id;
        let certos = req.body.certos;

        if (token == process.env.ADMIN_KEY) {
            
            for (let i = 0; i < certos.length; i++) {
                await Certo.create({
                    figurado_id: id,
                    palpite_id: certos[i]
                })
            } 

          return res.status(201).json('ok');

        } else {
            return res.status(400)
        }
    }, 
    definirCertoFigurado: async function (req,res) {
        let token = req.header('authorization').substr(7);
        let palpite_id = req.body.palpite_id;
        let figurados = req.body.figurados;

        if (token == process.env.ADMIN_KEY) {
            
            for (let i = 0; i < figurados.length; i++) {
                await Certo.findOrCreate({
                    where: {
                        figurado_id: figurados[i],
                        palpite_id: palpite_id
                    },
                    defaults: {
                        figurado_id: figurados[i],
                        palpite_id: palpite_id
                    },
                })

                
            } 

          return res.status(201).json('ok');

        } else {
            return res.status(400)
        }
    }, 
    checarToken: async function (req,res,next) {

        var token = req.header('authorization').substr(7);

        if (token === process.env.ADMIN_KEY) {

            next()
        } else {
            res.status(400).json("Token falso")
        }
    },
    mostrarTodasOpções: async function (req, res) {

        let posições = await Palpite.findAll({
            order: [['id', 'ASC']],
            where: {
                tipo: 'posição'
            }
        })
        
        let times = await Palpite.findAll({
            order: [['opção', 'ASC']],
            where: {
                tipo: 'time'
            }
        })

        let títulos = await Palpite.findAll({
            order: [['opção', 'ASC']],
            where: {
                tipo: 'título'
            }
        })

        let opções = {
            posições: posições,
            times: times,
            títulos: títulos,
        }

        let jogadores = await Figurado.findAll({
            attributes: ['id','nome','número'],
            order: [['nome', 'ASC']]
        })

        var data = {
            opções : opções,
            jogadores : jogadores
        }

        return res.status(201).json(data);
    },
    mostrarJogadores: async function (req, res) {
        let jogadores = await Figurado.findAll({
            attributes: ['id','nome','número'],
            order: [['nome', 'ASC']]
        })

        return res.status(201).json(jogadores);

    },
    mostrarFiguradoDia: async function (req, res) {
        let date = new Date();

        let data_completa = (date.getYear()+1900) +'-0'+(date.getMonth()+1)+'-'+date.getDate()+' 03:00:00';

        var figurado = await Figurado.findOne({ 
            where: { 
                data: data_completa
            },
        });

        return res.status(201).json(figurado.número);

    },
    mostrarFigurado: async function (req, res) {

        let id = req.body.id;
        let user = req.body.user;

        var figurado = await Figurado.findOne({ 
            where: { 
                número: id
            },
        });

        let certos = await Certo.findAll({where:{
            figurado_id: figurado.id
        }});

        let = certos__conjunto = [];

        for (let i = 0; i < certos.length; i++) {
            certos__conjunto.push(certos[i].palpite_id)
        }

        let dica = await Palpite.findByPk(figurado.dica);

        if (dica.tipo === 'título' ) {
            dica.dataValues.texto = 'ganhou'
        } 
        if (dica.tipo === 'time') {
            dica.dataValues.texto = 'jogou no'
        } 
        if (dica.tipo === 'posição') {
            dica.dataValues.texto = 'jogava de'
        }

        let dica_2 = await Palpite.findByPk(figurado.dica_2);

        if (dica_2.tipo === 'título' ) {
            dica_2.dataValues.texto = 'ganhou'
        } 
        if (dica_2.tipo === 'time') {
            dica_2.dataValues.texto = 'jogou no'
        } 
        if (dica_2.tipo === 'posição') {
            dica_2.dataValues.texto = 'jogava de'
        }

        figurado.dataValues.certos = certos__conjunto;

        figurado.dica = dica;

        figurado.dica_2 = dica_2;

        if (user !== null) {

    
            var palpites = await PalpiteUser.findAll({
                where: {
                    figurado_id: figurado.id,
                    user_id : user
                    
                },
                include: Palpite,
            });
    
            var palpites_clean = [];
    
            for (var i = 0; i < palpites.length; i++) {
    
                palpites[i].Palpite.dataValues.certo = palpites[i].resultado;
    
                palpites_clean.push(palpites[i].Palpite)
            }
    
            figurado.dataValues.palpites = palpites_clean;

            
        } else {
            figurado.dataValues.palpites = [];
        }

        var chute = await Chute.findOne({
            where: {
                user_id: user,
                figurado_id: figurado.id
            }
        });
        
        if (chute === null) {

            figurado.dataValues.chute = {
                chute_id: null,
                resultado: null,
                jogador: null
            }
        } else {

            var jogador = await Figurado.findOne({
                where: {
                    id: chute.chute_id
                }
            });

            figurado.dataValues.chute = chute;

            figurado.dataValues.chute.dataValues.jogador = {
                id: jogador.id,
                nome: jogador.nome,
                número: jogador.número,
                youtube: jogador.youtube,
                wikipedia: jogador.wikipedia,
                imagem: jogador.imagem
            };

        }

        return res.status(201).json(figurado);

    },
    checarPalpite: async function (req, res) {
        
        let figurado_id = req.body.figurado;
        let palpite_id = req.body.id;
        let user_id = req.body.user;
        let resultado = req.body.certo;
        
        await PalpiteUser.create({
            figurado_id: figurado_id,
            palpite_id: palpite_id,
            user_id: user_id,
            resultado: resultado
        })

        return res.status(201).json('ok');
    },
    checarChute: async function (req, res) {
        
        let figurado_id = req.body.figurado;
        let chute_id = req.body.chute;
        let user_id = req.body.user;
        let resultado = req.body.certo;

        await Chute.findOrCreate({
            where: {
                figurado_id: figurado_id,
                user_id: user_id,
            },
            defaults: {
                figurado_id: figurado_id,
                chute_id: chute_id,
                user_id: user_id,
                resultado: resultado
            },
        })

        return res.status(201).json('ok');
    },
    mostrarFigurados: async function (req, res) {
        let user = req.body.user

        let figurados = await Chute.findAll({
            where: {
                user_id: user,
                resultado: true
            },
            include: Figurado,
            order: [
                [Figurado, 'número', 'ASC']
            ]
        });

        return res.status(201).json(figurados);
    }
}