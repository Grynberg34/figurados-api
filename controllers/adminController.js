const jwt = require('jsonwebtoken');
const Figurinha = require('../models/Figurinha');
const Certo = require('../models/Certo');
const Alternativa = require('../models/Alternativa');

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports= {
    definirFigurinha: async function (req,res) {
        var token = req.header('authorization').substr(7);
        var nome_oficial = req.body.nome_oficial;
        var data = req.body.data;
        var youtube = req.body.youtube;
        var imagem = req.body.imagem;
        var dica = req.body.dica;
        var anos = req.body.anos;
        var certos = req.body.certos;
        var alternativos = req.body.alternativos;
    
        if (token == process.env.ADMIN_KEY) {

            var figurinha = await Figurinha.create({
                nome_oficial: nome_oficial,
                data: data,
                youtube: youtube,
                imagem: imagem,
                dica: dica,
                anos: anos,
            })

            for (var i = 0; i < alternativos.length; i++) {
                await Alternativa.create({
                    figurinha_id: figurinha.id,
                    nome_alternativo: alternativos[i]
                })
            } 

            for (var i = 0; i < certos.length; i++) {
                await Certo.create({
                    figurinha_id: figurinha.id,
                    palpite_id: certos[i]
                })
            } 

          return res.status(201).json(figurinha);

        } else {
            return res.status(400)
        }
      },
}
