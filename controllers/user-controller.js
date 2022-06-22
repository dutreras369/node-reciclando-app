const formLogin = (req, res) => {

    res.render('auth/login', {namePage: "Login"} )
}

export{
    formLogin
}