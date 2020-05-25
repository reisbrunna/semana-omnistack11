const connection = require('../database/connection');

module.exports = {

    async index(request, response) { //rota para listagem dos dados
        const { page = 1 } = request.query;

        const [count] = await connection('casos').count();

        const casos = await connection('casos') //limita o número de casos por página
            .join('ongs', 'ongs.id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'casos.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(casos);
    },

    async create(request, response) { //cadastro
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; // headers - guarda informações do contexto da requisição

        const [id] = await connection('casos').insert({
            title, description, value, ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) { //deleta um caso da tabela
        const { id } = request.params;
        const ong_id = request.headers.authorization; // headers - guarda informações do contexto da requisição

        const casos = await connection('casos')
            .where('id', id)
            .select('ong_id')
            .first();

        if (casos.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted ' });
        }
        await connection('casos').where('id', id).delete();
        return response.status(204).send(); // resposta vazia
    }

};