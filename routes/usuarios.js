const express = require('express');
const router = express.Router();
const { Usuario } = require ('../models');

// aqui definir as rotas no /usuarios

router.post('/', (request, response) => {

    const { body } = request;
    const { nome, nascimento, email } = body;

    Usuario.create({
        nome, email, nascimento
    })
        .then (usuario => {
            response
                .status(201)
                .json(usuario)
        })

        .catch ( ex => {
            console.error(ex);
            response
                .status(412)
                .send('não foi possível incluir o registro');
        })
});

router.get('/:usuarioId', (request, response) => {

    const { params } = request
    const { usuarioId } = params

    Usuario.findById(usuarioId)
        .then( usuario => {
            if (!usuario)
            {
                response.status(404).send('Usuário não encontrado')
            }
            else
            {
                response.status(200).json(usuario)
            }
        })
        .catch( ex => {
            console.error(ex);
            response.status(412).send('Não foi possivel consultar o banco de dados')
        })

})

router.put("/:usuarioId", (request, response) => {

    // const { params, body } = request
    // const { usuarioId } = params
    // const { nome, email, nascimento } = body

    const { params: {usuarioId}, body: { nome, email, nascimento} } = request

    Usuario.findById(usuarioId)
        .then( usuario => {
            if (!usuario)
            {
                response.status(404).send('Usuário não encontrado')
            }
            else
            {
                return usuario.update({
                    nome, email, nascimento
                })
                .then(()=>{
                    response.status(200).json(usuario)
                })
            }
        })
        .catch( ex => {
            console.error(ex);
            response.status(412).send('Não foi possivel consultar o banco de dados')
        })

})

module.exports = router;