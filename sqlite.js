const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');

db.serialize(function(){

    db.run("CREATE TABLE IF NOT EXISTS pessoa (nome VARCHAR(200))");
    
    const stmt = db.prepare("INSERT INTO pessoa VALUES (?)");
    
    for (let i=1; i <= 10; i++)
    {
        stmt.run("Pessoa " + i);
    }

    stmt.finalize();

    db.each('SELECT * FROM pessoa', function(error, row){

        if (error)
        {
            console.error('Não foi possível realizar a consulta', error);
        }
        else
        {
            console.log('Pessoa: ', row);
        }

    });

});