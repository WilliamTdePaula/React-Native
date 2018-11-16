module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/tasks')//para essa url ele ira fazer
        .all(app.config.passport.authenticate())//ele ira autenticar tudo primeiro, para dar o apssaporte ai sim fazer as coisas
        .get(app.api.task.getTasks)//para metodos do tipo get ele camará esse caminho
        .post(app.api.task.save)//para metodos do tipo post ele chamará esse caminho

    app.route('/tasks/:id')//para essa url ele ira fazer
        .all(app.config.passport.authenticate())//ele ira autenticar tudo primeiro, para dar o passaporte ai sim fazer as coisas
        .delete(app.api.task.remove)//para metodos do tipo delte ele chamará esse caminho

        app.route('/tasks/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)
}