import express from 'express'
import { formLogin, formRegsitry, formRestorePass } from '../controllers/user-controller.js'

const router = express()

router.get('/login', formLogin)

router.get('/registrar', formRegsitry)

router.get('/restablecer-password', formRestorePass)

export default router;