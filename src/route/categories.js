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
    add_categories,
    detail_categories,
    showall_categories,
    edit_categories,
    delete_categories
} = require('../model/categories')

//MULTER
const multer = require ('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './src/assets/images/');
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
    const {name_category} =req.body
    const photo = (req.file.filename)
    const created_on = new Date()
    const updated_on = new Date()
    mysql.execute(add_categories,
        [name_category, photo,created_on, updated_on],
        (err,result,field) => {
        res.send({success:true,data:result})
    })
})

//DETAIL
router.get('/:id', auth, (req, res) => {
    const {id} = req.params
    mysql.execute(detail_categories,[id] ,(err, result, field) => {
        res.send({success:true, data: result})
    })
})

//SHOW ALL
router.get('/', (req, res) => {
    mysql.execute(showall_categories,[],(err,result, field) => {
        console.log(err)
        res.send({success:true,data:result})
    })
})


//EDIT DATA
router.put('/:id', upload.single('photo'), auth, admin, (req,res) => {
    const {id} = req.params
    const photo = (req.file.filename)
    const {name_category} =req.body
    const updated_on = new Date()
    mysql.execute(edit_categories,
        [name_category, photo, updated_on, id],
        (err,result,field) => {
            console.log(err)
        res.send({success:true,data:result})
    })
})

//DELETE
router.delete('/:id',auth,admin,(req,res) => {
    const {id} = req.params
    mysql.execute(delete_categories,
        [id],(err,result,field) => {
            res.send({succes:true,data:result})
        })
})

module.exports =router