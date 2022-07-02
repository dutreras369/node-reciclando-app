import express from 'express'
import { formLogin, formRegistry, formRestorePass, saveRegistry } from '../controllers/user-controller.js'

const router = express()

router.get('/login', formLogin)

router.get('/registrar', formRegistry)

router.post('/registrar', saveRegistry)


router.get('/restablecer-password', formRestorePass)

export default router;