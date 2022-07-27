import express from 'express'
import { panel, createPoint } from '../controllers/point-controller.js'

const routerPoint = express.Router()

routerPoint.get('/', panel)
routerPoint.get('/crear', createPoint)

export default routerPoint 