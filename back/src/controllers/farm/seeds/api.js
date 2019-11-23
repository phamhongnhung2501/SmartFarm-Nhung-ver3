const express = require('express');
const api = express();
const auth = require('../../auth/services').authentication;
const serviceSeeds = require('./services');

api.get('/', serviceSeeds.getSeeds);
api.get('/gateway', serviceSeeds.getSensor);
api.get('/:seed', auth, serviceSeeds.getSeed);
api.post('/', auth, serviceSeeds.newSeed);


module.exports = api;