const jwt = require('jsonwebtoken');
const Figurado = require('../models/Figurado');
const Palpite = require('../models/Palpite');
const Certo = require('../models/Certo');
require("dotenv").config()

let jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports= {
    definirFigurado: async function (req,res) {
        let token = req.header('authorization').substr(7);
        let id = req.body.id;
        let certos = req.body.certos;
    
        console.log(certos)

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

        return res.status(201).json(opções);
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

        let id = parseInt(req.params.id);

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

        figurado.dataValues.certos = certos__conjunto;

        figurado.dica = dica;


        return res.status(201).json(figurado);


    },
}