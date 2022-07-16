import {check, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { generateId } from '../helpers/token.js'
import { emailRegistry, restorePass } from '../helpers/emails.js'

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
        page: "Olvidé el password", 
        csrfToken: req.csrfToken()
    } )
}

const ressetPass = async  (req, res) => {

    await check('email').isEmail().withMessage('El email debe ser valido').run(req)

    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/restore-pass', {
            page: "Olvide el password",
            csrfToken: req.csrfToken(),
            errors: result.array()
        })
    }
    
    // search user for email
    const {email} = req.body

    const user = await User.findOne({where: {email}})

    if(!user){
        return res.render('auth/restore-pass', {
            page: "Olvide el password",
            csrfToken: req.csrfToken(),
            errors: [{msg: 'El Email no pertenece a ningún usuario'}]
        })
    }

    // generate token 
    user.token = generateId();
    await user.save();

    // send email
    restorePass({
        email: user.email, 
        nombre: user.name,
        token: user.token
    })

    // render msg
    res.render('templates/msg', {
        page: 'Restablece tu password',
        msg: 'Hemos enviado un mail con las instrucciones'
    })
}

const validToken = async  (req, res) => {
    
    const {token} = req.params;

    const user = await User.findOne({where: {token}})

    if(!user){
        return res.render('auth/confirm-account', {
            page:  'Restablcer password',
            msg: 'Hubo un error al validar la información',
            error: true
        })
    }

    // form for change to password 
    res.render('auth/reset-password', {
        page: 'Restablecer password',
        csrfToken: req.csrfToken(),
    })    
}


const newPassword = async  (req, res) => {
    
    //valid pass

    await check('password').not().isEmpty().isLength({min: 6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('confirm-password').equals('password').withMessage('Los password no son iguales').run(req.body)
    
    let result = validationResult(req)

    if(!result.isEmpty()){
        return res.render('auth/reset-password', {
            page: "Restablecer password",
            csrfToken: req.csrfToken(),
            errors: result.array()
        })
    }

    const { token } = req.params
    const { password } = req.body 
    
    // identificar quien hace el cambio
    const user = await User.findOne({where: {token}})
    
    // hash new pass
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.token = null

    await user.save()

    res.render('auth/confirm-account', {
        page:  'Password Restablecido',
        msg: 'El password se ha cambiado correctamente'
    })

}

export{
    formLogin,
    formRegistry,
    saveRegistry,
    confirmAccount,
    formRestorePass, 
    ressetPass,
    validToken,
    newPassword
}