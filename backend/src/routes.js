const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/Session Controller');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY ]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),  OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/casos', CasosController.create);
routes.get('/casos', CasosController.index);
routes.delete('/casos/:id', CasosController.delete);

module.exports = routes; // exporta uma váriavel dentro de um arquivo