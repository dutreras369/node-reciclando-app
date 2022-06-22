import express from 'express'
import { formLogin } from '../controllers/user-controller.js'

const router = express()

router.get('/login', formLogin)

router.post('/', (req, res) =>{
    res.json({msj: "hola post"})
})

export default router;