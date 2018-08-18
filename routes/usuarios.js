const express = require('express')
const Sequelize = require('sequelize')
const router = express.Router()
const { Usuario } = require ('../models')

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

// delete - usuarios/1
router.delete("/:usuarioId", (request, response) => {

    const { params:{usuarioId} } = request;

    Usuario.destroy({
        where: {
            id: usuarioId
        }
    })
    .then( deletados => {
        if(deletados > 0)
        {
            response.status(204).send()
        }
        else
        {
            response.status(404).send('Usuario não encontrado')
        }
    })
    .catch(ex => {
        console.error(ex)
        response.status(412).send('Não foi possivel deletar o usuarios')
    })

})

// GET - /usuarios?nome=...
router.get('/', (request, response) => {

    const { query:{nome} } = request

    const usuarioQuery = {
        where:{}
    }

    if (nome)
    {
        usuarioQuery.where.nome = {
            [Sequelize.Op.like]: `%${nome}%`
        }
    }

    Usuario.findAll(usuarioQuery)
        .then(usuarios => {
            response.status(200).json(usuarios)
        })
        .catch(ex=>{
            console.error('Não foi possível conectar ao BD', error)
        })
})

module.exports = router;