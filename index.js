import express from 'express'
import router  from './routes/user-routes.js'
import db from './config/db.js'
// Create app
const app = express()

// Sincronized dbs
try {
    db.authenticate();
    console.log('Contectado al servidor')  
} catch (error) {
    console.log(error)
}

// Up Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Find static folder
app.use(express.static('public'))

// Routing user authentication
app.use('/auth', router)



// Config express
const port = 3000

app.listen(port, () => {
    console.log("Server on in port: " + port )
})