const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // importando a rota


const app = express(); //armazena a aplicação
app.use(cors());
app.use(express.json())
app.use(routes);
app.listen(3333);// porta de acesso  

/*
MÉTODOS HTTP:

* GET: Buscar uma informação do back-end // quando acessa a rota no navegador
* POST: criar uma informação no back-end
* PUT : alterar uma informação no back-end
* DELETE: deletar uma informação no back-end
*/

/**
 * TIPOS DE PARÂMETROS
 * 
 * Query params: parâmetros nomeados enviados na rota após "?" (filtros, paginação)
 * Route params: parâmetros utilizados para identificar recursos
 * Request body: corpo da requisição utilizado para criar ou alterar recursos
 * 
 */
 // npm start - inicializa o servidor
 

