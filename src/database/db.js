// importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

// iniciar objeto de fará operações no banco de dados
// Rodar comando 'node src/database/db.js' para gerar arquivo de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

// utilizar o objetos de banco de dados , para nossas operções
 db.serialize(() => {
     
    // Com esses comandos SQL eu vou:

    // 1.Criar tabelas do banco de dados
    // db. run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // 2.Inserir dados na tabela
    // const query =`
    // INSERT INTO places (
    //     image,
    //     name,
    //     address,
    //     address2,
    //     state,
    //     city,
    //     items
    //     ) VALUES (?, ?, ?,?, ?, ?, ?);
    // `;

    // const values = [
    //     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    //     "Alumini",
    //     "Guilherme Gamball, Jardim América",
    //     "nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Ferros e Metais"
    // ]


    // function afterInsertData(err){
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log("Cadastrado com sucesso");
    //     console.log(this);
    // }
    // db.run(query, values, afterInsertData);
 


    //3.Para consultar os dados da tabela basta descomentar esse trecho da aplicação e visualizar no console
    // db.all(`SELECT * FROM places`, function(err, rows){
    //    db.all(`SELECT id, name FROM places`, function(err, rows){
    //        if(err){
    //            return console.log(err);
    //        }
    //        console.log("Registros:");
    //        console.log(rows);   
    //    })
    // })

    // 4. Para deletar um dado da tabela basta descomentar esse trecho da aplicação, informmar um 'id' dentro do colchetes e visualizar no console
    // db.run(`DELETE FROM places WHERE id = ?`,[5], function(err){
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log("Registro deletado com sucesso");
    // });

    


 })


module.exports = db;