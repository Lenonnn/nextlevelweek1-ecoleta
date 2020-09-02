// Chama a função do express  para iniciar o servidor
const express = require('express')

// Cria uma variável server que receber a função 'express'
// Para iniciar o servidor
const server = express()

// Pegar banco de dados;
const db = require("./database/db");

// configurar pasta 'public' para enxergar css no node.js
server.use(express.static("public"))

// Habilitar o uiso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))


// usando template engine
const nunjucks = require('nunjucks');
const { urlencoded } = require('express');
// Define pastas de visualização de html
nunjucks.configure("src/views", {
    // Passa o nome do servidor express
    express: server,
    // Salva alummas coisas na memoria opra responder mais rápido
    noCache: true
}) 


// Caminho da aplicação
// req: Requisição
// res: Resposta
server.get("/", (req, res) =>{
    // Para essa rota, responde com um arquivo html
    return res.render("index.html", { title: "Seu Marketplace de coleta de resíduos"})
})

server.get("/create-point", (req, res) =>{

    //req.query: Query strings da nossa url
    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do formulário
    // console.log(req.body)

    // Inserir dados no banco de dados

        const query =`
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
        ) VALUES (?, ?, ?,?, ?, ?, ?);
    `;

    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err);
            return res.send("Erro no cadastro!");
        }
        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved:true })
    }

    db.run(query, values, afterInsertData);

})





server.get("/search", (req, res) =>{

    const search = req.query.search ;
    if(search == ""){
        // Pesquisa vazia
     return res.render("search-results.html", { total: 0})

    }



    //Pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){

            if(err){
               return console.log(err);
            }

            const total = rows.length;
            // console.log("Registros:");
            // console.log(rows);
            // Mostrar a página HTML com os dados do banco de dados
            return res.render("search-results.html", { places: rows , total: total});
            // Também funciona da forma abaixo
            //return res.render("search-results.html", { places: rows , total});  
    })
})

// Ligar o servidor na porta 3000/3002
const PORT = process.env.PORT || 3002 ;
server.listen(PORT)
// ou
// server.listen(3002)

//Stoped 01:00:00 aula4
console.log("Aplicação rodando na porta ... ",PORT)



// Stoped at 01:18:00