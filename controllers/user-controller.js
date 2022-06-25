const formLogin = (req, res) => {

    res.render('auth/login', {
        page: "Iniciar Sesión"
    } )
}

const formRegsitry = (req, res) => {

    res.render('auth/registro', {
        page: "Crear Cuenta"
    } )
}

const formRestorePass = (req, res) => {

    res.render('auth/restore-pass', {
        page: "Olvidé el password"
    } )
}

export{
    formLogin,
    formRegsitry,
    formRestorePass
}