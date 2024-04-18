const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports = {
  autenticar: function (req,res) {
    passport.authenticate('google', {session: false}, 
    function (err, user, info){
      if (user) {
        var payload = { id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.status(200).json({ "mensagem" : 'Token gerado', token: token });
      } else {
        return res.status(400).json("Usuário com esse nome existe. Tente novamente");
      }
    }) (req, res)
  },
  gerarTokenGoogle: async function (req, res) {
    var profile = req.body.profile;

    var date = new Date();

    User.findOrCreate( {where: { google_id: profile.sub }, 
      defaults : {
        name: profile.name,
        email: profile.email,
        created: date
      }
    }).then(function (user) {
      console.log(user)
      if (user[0]) {
        var payload = { id: user[0].id };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.status(200).json({ "mensagem" : 'Token gerado', token: token });
      }
    }).catch(function(err){
      console.log(err)
      return res.status(400).json("Usuário com esse nome existe. Tente novamente");
    });
  },
  mostrarInfosUser: function (req,res) {
    var token = req.header('authorization').substr(7);

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      console.log(decoded)
      res.status(200).json(decoded)
    });
  },
}