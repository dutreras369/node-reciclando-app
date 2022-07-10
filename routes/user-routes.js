import express from 'express'
import { formLogin, formRegistry, formRestorePass, saveRegistry, confirmAccount } from '../controllers/user-controller.js'

const router = express()

router.get('/login', formLogin)

router.get('/registrar', formRegistry)

router.get('/confirmar-cuenta/:token', confirmAccount)

router.post('/registrar', saveRegistry)


router.get('/restablecer-password', formRestorePass)

export default router;