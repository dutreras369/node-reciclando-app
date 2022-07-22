import express from 'express'
import { admin } from '../controllers/point-controller.js'

const routerPoint = express.Router()

routerPoint.get('/', admin)

export default routerPoint 