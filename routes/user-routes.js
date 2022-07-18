import express from 'express'
import { formLogin, formRegistry, formRestorePass, saveRegistry, 
    confirmAccount, ressetPass, validToken, newPassword, authenticate } from '../controllers/user-controller.js'

const router = express()

router.get('/login', formLogin)
router.post('/login', authenticate)


router.get('/registrar', formRegistry)

router.get('/confirmar-cuenta/:token', confirmAccount)

router.post('/registrar', saveRegistry)

router.get('/restablecer-password', formRestorePass)

router.post('/reset-pass', ressetPass)

router.get('/olvide-password/:token', validToken )

router.post('/olvide-password/:token', newPassword )

export default router;