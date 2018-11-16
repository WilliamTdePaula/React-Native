const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('users')
            .whereRaw("LOWER(email)=LOWER(?)", req.body.email)//  Ignorando letras maiusculas ou minusculas (requisição que pode ser feita com script do SQL)
            /*.where({email: req.body.email})*/
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(401).send()
                }

                const payload = { id: user.id }
                res.json({
                    nome: user.nome,
                    email: user.email,
                    token: jwt.encode(payload, authSecret),
                })
            })
        } else {
            res.status(400).send('Usuário não cadastrado!')
        }
    }

    return { signin }
}