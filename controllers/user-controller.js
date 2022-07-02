import {check, validationResult} from 'express-validator'
import User from '../models/User.js'

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

const saveRegistry = async (req, res) => {
    
    await check('name').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('El email debe ser valido').run(req)
    await check('password').isLength({min: 6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('password_confirm').equals('password').withMessage('Los password no son iguales').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/registry', {
            page: "Crear Cuenta",
            user: {
                name: req.body.name,
                email: req.body.email
            },
            errors: result.array()
        })
    }

    const user = await User.create(req.body)

    res.json(user);
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