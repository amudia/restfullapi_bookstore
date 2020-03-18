require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const books = require('./src/route/books')
const users = require('./src/route/users')
const categories = require('./src/route/categories')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/src/assets',express.static('src/assets/images'))
app.use('/src/assets',express.static('src/assets/books'))
app.use('/users',users)
app.use('/books',books)
app.use('/categories',categories)

app.post('/',(req,res)=>{
    res.send(req.body)
})

const port = process.env.APP_PORT

app.listen(port,()=>{
    console.log('App Listen on port'+port)
})

