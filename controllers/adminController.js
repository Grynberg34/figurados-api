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
        let nome_oficial = req.body.nome_oficial;
        let data = req.body.data;
        let youtube = req.body.youtube;
        let wikipedia = req.body.wikipedia;
        let imagem = req.body.imagem;
        let dica = req.body.dica;
        let anos = req.body.anos;
        let número = req.body.número;
        let certos = req.body.certos;
    
        if (token == process.env.ADMIN_KEY) {

            let figurado = await Figurado.update({                
                    nome_oficial: nome_oficial,
                    data: data,
                    youtube: youtube,
                    imagem: imagem,
                    dica: dica,
                    wikipedia: wikipedia,
                    número: número,
                    anos: anos, 
                },
                {
                  where: {
                    id: id,
                  },
                },
            );
            


            for (let i = 0; i < certos.length; i++) {
                await Certo.create({
                    figurado_id: figurado.id,
                    palpite_id: id
                })
            } 

          return res.status(201).json(figurado);

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

        let figurado = await Figurado.findOne({ 
            where: { 
                data: data_completa
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
        } else if (dica.tipo === 'time') {
            dica.dataValues.texto = 'jogou no'
        } else if (dica.posição === 'posição') {
            dica.dataValues.texto = 'jogou de'
        }

        figurado.dataValues.certos = certos__conjunto;

        figurado.dica = dica;

        return res.status(201).json(figurado);

    },
}
