//const app = require('express')()
//ou
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())//isso será aplicado em todas requisições

app.use(meuMiddleware())//ou seja, sempre que for chamar uma função, chamara essa função a baixo

function meuMiddleware(){
    return (req, res, next) =>{
        console.log('antes  de tudo: meu middlewere...')
        next()
    }
}

app.get('/', (req, res, next) => {
    console.log('Func 0')
    next()
})

app.get('/', (req, res, next) =>{
    console.log('Func 1')
    res.status(200).send('Meu Backend')
    next()
})

app.get('/teste/:valor', (req, res,) =>{
    console.log('Meu nome é ' + req.params.valor)
    res.status(200).send('meu pai é ' + req.params.valor)//se for acessar o dado com o link por ex: localhost:3000/teste/variavel
})

app.get('/teste1/:valor', (req, res) =>{
    res.status(200).send('mais um teste de ' + req.query.texto)//se for acessar do seguinte jeito: localhost:3000/teste/qualquercoisa?vairiavel=conteudo
})

//QUANDO FOR POST
app.post('/post/:valor', (req, res) =>{
    res.status(200).send('meu pai é ' + req.body.sobrenome)//se for acessar o dado com o link por ex: localhost:3000/teste/variavel
})

//RETORNAR O CORPO DA REQUISIÇÃO
app.post('/post2/:valor', (req, res, next) =>{
    res.status(200).send('CORPO: ' + JSON.stringify(req.body))//pegando o corpo e transoformando em string
    next()
})

//Acessar um array
app.post('/post2/:valor', (req, res) =>{
    console.log('Nome dentro do array dependentes: ' + req.body.dependente[0].nome )
})

app.listen(3000, () =>{
    console.log('backend executado')
})
