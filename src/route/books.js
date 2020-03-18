require('dotenv').config()
const router = require('express').Router()
const mysql = require('../dbconfig')
const {
    auth, 
    admin, 
    customer,
    all
} = require('../middleware')
const {
    add_books,
    detail_books,
    showall_books,
    edit_books,
    delete_books
} = require('../model/books')

//MULTER
const multer = require ('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/assets/books/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

//ADD//
router.post('/', upload.single('photo'), auth, admin, (req,res) => {
    const {id_category, title, author, publisher, sinopsis, year, edition, quantity, paper_type, price, dimension, num_of_pages} =req.body
    const photo = (req.file.filename)
    const created_on = new Date()
    const updated_on = new Date()
    mysql.execute(add_books,
        [photo, id_category, title, author, publisher, sinopsis, year, edition, quantity, paper_type, price, dimension, num_of_pages, created_on, updated_on],
        (err,result,field) => {
        res.send({success:true,data:result})
    })
})

//DETAIL
router.get('/:id', auth, (req, res) => {
    const {id} = req.params
    mysql.execute(detail_books,[id] ,(err, result, field) => {
        res.send({success:true, data: result})
    })
})

//SHOW ALL
router.get('/', (req, res) => {
    mysql.execute(showall_books,[],(err,result, field) => {
        res.send({success:true,data:result})
    })
})


//EDIT DATA
router.put('/:id', upload.single('photo'), auth, admin, (req,res) => {
    const {id} = req.params
    const photo = (req.file.filename)
    const {id_category, title, author, publisher, sinopsis, year, edition, quantity, paper_type, price, dimension, num_of_pages} =req.body
    const updated_on = new Date()
    mysql.execute(edit_books,
        [photo, id_category, title, author, publisher, sinopsis, year, edition, quantity, paper_type, price, dimension, num_of_pages, updated_on, id],
        (err,result,field) => {
            console.log(err)
        res.send({success:true,data:result})
    })
})

//DELETE
router.delete('/:id',auth,admin,(req,res) => {
    const {id} = req.params
    mysql.execute(delete_books,
        [id],(err,result,field) => {
            res.send({succes:true,data:result})
        })
})

module.exports =router