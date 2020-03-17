require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const users =require('./src/route/users')

const cors = require('cors')
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/src/assets',express.static('src/assets/images'))
app.use(cors())

app.use('/users',users)

const port = process.env.APP_PORT


app.post('/',(req,res)=>{
    res.send(req.body)
})

app.listen(port,()=>{
    console.log('App Listen on port'+port)
})