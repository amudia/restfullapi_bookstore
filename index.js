require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const users = require('./src/route/users')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/src/assets',express.static('src/assets/images'))
app.use('/users',users)

app.post('/',(req,res)=>{
    res.send(req.body)
})

const port = process.env.APP_PORT

app.listen(port,()=>{
    console.log('App Listen on port'+port)
})

