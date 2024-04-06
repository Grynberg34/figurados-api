const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Palpite = require('../models/Palpite');

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_KEY;

module.exports= {

}
