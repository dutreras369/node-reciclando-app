import {check, validationResult} from 'express-validator'
import User from '../models/User.js'
import { generateId } from '../helpers/token.js'
import { emailRegistry } from '../helpers/emails.js'

const formLogin = (req, res) => {

    res.render('auth/login', {
        page: "Iniciar Sesión"
    } )
}

const formRegistry = (req, res) => {
    
    res.render('auth/registry', {
        page: "Crear Cuenta",
        csrfToken: req.csrfToken()
    } )
}

const saveRegistry = async (req, res) => {
    
    await check('name').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('El email debe ser valido').run(req)
    await check('password').not().isEmpty().isLength({min: 6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('confirmPassword').equals('password').withMessage('Los password no son iguales').run(req.body)

    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/registry', {
            page: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            user: {
                name: req.body.name,
                email: req.body.email
            },
            errors: result.array()
        })
    }
    
    // extract data
    const {name, email, password } = req.body

    const userExist = await User.findOne({ where: { email }})

    if(userExist){
        return res.render('auth/registry', {
            page: "Crear Cuenta",
            csrfToken: req.csrfToken(),
            user: {
                name: req.body.name,
                email: req.body.email
            },
            errors: [{ msg: 'El usuario ya esta registrado' }]
        })        
    }

    // Save data
    const user = await User.create({
            name,
            email,
            password,
            token: generateId()
        }
    )

    // send confirmation email
    emailRegistry({
        name: user.name,
        email: user.email,
        token: user.token
    })
    

    // reder confirmation message
    res.render('templates/msg', {
        page: 'Cuenta creada correctamente',
        msg: 'Hemos enviado un mail de confirmacion, presiona en el enlace'
    })

    // res.json(user);
}


const confirmAccount = async (req, res) => {

    const { token } = req.params 

    // Verify valid token
    const user = await User.findOne({ where: { token }})

    if(!user){
        return res.render('auth/confirm-account', {
            page:  'Error al confirmar cuenta',
            msg: 'hubo un error al confirmar la cuenta',
            error: true
        })
    }
    
    // Verify account
    user.token = null 
    user.status = true
    await user.save();
        
    return res.render('auth/confirm-account', {
        page:  'Cuenta confirmada',
        msg: 'La cuenta se confirmo correctamente',
    })
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
    confirmAccount,
    formRestorePass
}