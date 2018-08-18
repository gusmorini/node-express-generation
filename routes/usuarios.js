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

module.exports = router;