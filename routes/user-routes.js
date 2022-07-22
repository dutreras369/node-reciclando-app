import express from 'express'
import { formLogin, formRegistry, formRestorePass, saveRegistry, 
    confirmAccount, ressetPass, validToken, newPassword, authenticate } from '../controllers/user-controller.js'

const routerAuth = express()

routerAuth.get('/login', formLogin)
routerAuth.post('/login', authenticate)


routerAuth.get('/registrar', formRegistry)

routerAuth.get('/confirmar-cuenta/:token', confirmAccount)

routerAuth.post('/registrar', saveRegistry)

routerAuth.get('/restablecer-password', formRestorePass)

routerAuth.post('/reset-pass', ressetPass)

routerAuth.get('/olvide-password/:token', validToken )

routerAuth.post('/olvide-password/:token', newPassword )

export default routerAuth;