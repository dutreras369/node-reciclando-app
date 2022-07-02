const formLogin = (req, res) => {

    res.render('auth/login', {
        page: "Iniciar Sesión"
    } )
}

const formRegistry = (req, res) => {

    res.render('auth/registry', {
        page: "Crear Cuenta"
    } )
}

const saveRegistry = (req, res) => {
    console.log(req.body)

}

const formRestorePass = (req, res) => {

    res.render('auth/restore-pass', {
        page: "Olvidé el password"
    } )
}

export{
    formLogin,
    formRegistry,
    saveRegistry,
    formRestorePass
}