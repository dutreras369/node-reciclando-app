import express from 'express'
import router  from './routes/user-routes.js'

const app = express()

// Up Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Routing user authentication
app.use('/auth', router)

// Config express
const port = 3000

app.listen(port, () => {
    console.log("Server on in port: " + port )
})