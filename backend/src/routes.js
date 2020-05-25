const express = require('express');
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/casos', CasosController.create);
routes.get('/casos', CasosController.index);
routes.delete('/casos/:id', CasosController.delete);

module.exports = routes; // exporta uma váriavel dentro de um arquivo