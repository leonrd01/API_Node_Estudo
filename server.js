import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/usuarios', async (req, res) => { 

    await prisma.user.create({
        data: {
            nome: req.body.nome, 
            turma: req.body.turma,  
            nota_trabalho: req.body.nota_trabalho, 
            nota_projeto: req.body.nota_projeto, 
            nota_avaliacao1: req.body.nota_avaliacao1, 
            nota_avaliacao2: req.body.nota_avaliacao2,
            qualitativo: req.body.qualitativo, 
            media: req.body.media, 
            total: req.body.total 
        }
    })

    res.status(201).json(req.body) // retornando o usuario criado com o status 201 (created)

})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id // pegando o id do usuario da url
        },
        data: {
            nome: req.body.nome, 
            turma: req.body.turma,  
            nota_trabalho: req.body.nota_trabalho, 
            nota_projeto: req.body.nota_projeto, 
            nota_avaliacao1: req.body.nota_avaliacao1, 
            nota_avaliacao2: req.body.nota_avaliacao2,
            qualitativo: req.body.qualitativo, 
            media: req.body.media, 
            total: req.body.total 
        }
    })

    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id // pegando o id do usuario da url
        },
    })

    res.status(200).json({ message: 'usuario deletado com sucesso!'})
    
})


app.get("/usuarios", async (req, res) => {

    const users = await prisma.user.findMany(); // buscando todos os usuarios no banco de dados
    res.status(200).json(users); // retornando todos os usuarios com o status 200 (ok)
});

app.listen(3000) // rodando o servidor na porta 3000




/*

    1° passo: npm init -y  <-  inicializa o projeto com o package.json 
    2° passo: npm i express  <- instala o express 
    3° passo: no aquivo ‘package.json’ adicionar “"type": "module"  <-  para usar o import
    4° passo: npm install prisma –save-dev  <- instala o prisma como dev dependency
    5° passo: npx prisma init  <-  inicializa o prisma e cria o arquivo .env e o arquivo schema.prisma
    6° passo: npx prisma db push <- cria o banco de dados e as tabelas no banco de dados
    7° passo: npm install @prisma/client <- instala o prisma client
    8° passo: npx prisma studio  <-  abrir prisma studio
    9° passo: node - -watch server.js  <-  iniciar servidor


*/