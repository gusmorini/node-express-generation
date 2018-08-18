var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const SECRET_KEY = "&uaQ76gR#SQPthHV82#Dt=HnUwzbM8KnP&T#uTvG*NsQZMspRt";
const USERNAME = 'gusmorini';
const PASSWORD = '123';

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  try {
    
    const {token} = req.headers;
    const payload = jwt.verify(token, SECRET_KEY);
    console.log('Token válido', payload);
    res.status(200).send('Acesso Permitido');

  } catch (exception) {

    console.error('Token inválido', exception);
    res.status(403).send('Acesso negado');

  }

});

// rota login
router.post('/login', function(request, response){

  const {body} = request;
  const {username, password} = body;
  
  if(username === USERNAME && password === PASSWORD){
    //usuario logado
    const payload = {
      username
    }
    const token = jwt.sign(payload, SECRET_KEY);
    response.status(200).json({
      token
    });
  }else{
    response.status(401).send('usuário ou senha incorretos.');
  }
  
});

module.exports = router;
