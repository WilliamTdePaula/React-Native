//o require é como se fosse o import e export do react-native, mas no nodejs, isso se chama padrão de modulos

const config = require('../knexfile.js')//importando a configuração do knex (configuração de conexão com o banco de dados)
const knex = require('knex')(config)

//caso tivesse varias conexoes
//const knex = require('knex')(config['nomeconexao', 'nomeconexao'])

//caso esse backend for atender um app que usa muitas requisições, não é bom fazer essa chamada abaixo, automaticamente
//knex.migrate.latest([config]) //sempre vai criar as tabelas, casos elas já existtam, ele não cria novamente
module.exports = knex

