require('dotenv').config()
const router = require('express').Router()
const mysql = require('../dbconfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {
    auth, 
    admin, 
    customer,
    all
} = require('../middleware')
const {
    add_user,
    detail_user,
    edit_user,
    delete_user
} = require('../model/users')

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
const fileFilter = (req, file, cb)=>{
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

//LOGIN
router.post('/login',(req,res)=>{
    const {email,password}=req.body
    const users = 'SELECT * FROM tbl_users WHERE email=?'
    mysql.execute(users,[email], (err,result,field)=>{
        console.log(result)
        if(result.length>0){
            if(bcrypt.compareSync(password,result[0].password)){
                const roles = result[0].id_role
                const id = result[0].id_user
                const auth = jwt.sign({email, id, roles},process.env.APP_KEY)
                const token = auth
                const is_revoked = 0
                const created_on = new Date()
                const updated_on = new Date()
                const revoked = `INSERT INTO revoked_token (token, is_revoked, created_on, updated_on) VALUES (?,?,?,?)`
                mysql.execute(revoked, [token,is_revoked,created_on,updated_on], (err, result, field)=>{
                    res.send({
                        success: true,
                        auth,
                    })
                })           
            }else{
                res.send({
                    success:false,
                    msg: "Incorrect password"
                })
            }
        }else{
            res.send({
                success:false,
                msg: "email not found"
            })
        }
    })
})

/* LOGOUT */
router.get('/logout', auth,(req, res)=>{
    const token = req.headers.auth_token
    const sql = 'UPDATE revoked_token SET is_revoked=1 where token=?'
    mysql.execute(sql, [ token], (err, result, field)=>{
        res.send({
            result,
            success:true,
            msg:req.headers.auth_token
        })

    })
})

//REGISTER//
router.post('/register/admin',(req,res)=>{
    const {first_name, last_name, email, password} =req.body
    const enc_pass = bcrypt.hashSync(password);
    const photo = 'https://image.flaticon.com/icons/png/512/145/145843.png'
    const created_on = new Date()
    const updated_on = new Date()
    const sql = `SELECT email from tbl_users WHERE email =?`
    mysql.execute(sql, [email], (err,result1, field)=>{
        if(result1 == ''){
            mysql.execute(add_user,
                [first_name, last_name, email, enc_pass, photo, '1', created_on, updated_on],
                (err,result,field)=>{
                res.send({success:true,data:result})
            })
        
        }else {
            res.send({success:false, msg:'Email Does Exist'})
        }
    })
})

router.post('/register/customer',(req,res)=>{
    const {first_name, last_name, email, password} =req.body
    const enc_pass = bcrypt.hashSync(password);
    const photo = 'https://image.flaticon.com/icons/png/512/145/145843.png'
    const created_on = new Date()
    const updated_on = new Date()
    const sql = `SELECT email from tbl_users WHERE email =?`
    mysql.execute(sql, [email], (err,result1, field)=>{
        if(result1 == ''){
            mysql.execute(add_user,
                [first_name, last_name, email, enc_pass, photo, '2', created_on, updated_on],
                (err,result,field)=>{
                res.send({success:true,data:result})
            })
        
        }else {
            res.send({success:false, msg:'Email Does Exist'})
        }
    })
})

//DETAIL
router.get('/:id', auth, (req, res) => {
    const {id} = req.params
    mysql.execute(detail_user,[id] ,(err, result, field)=>{
        res.send({success:true, data: result})
    })
})


//EDIT DATA
router.put('/admin/:id',upload.single('photo'),auth, (req,res)=>{
    const {first_name, last_name, email, password} =req.body
    const {id} = req.params
    const photo = (req.file.filename)
    const enc_pass = bcrypt.hashSync(password);
    const updated_on = new Date()
    const sql = `SELECT email from tbl_users WHERE email =?`
    mysql.execute(sql, [email], (err,result1, field)=>{
        if(result1 == ''){
            mysql.execute(edit_user,
                [first_name, last_name, email, enc_pass, photo, '1', updated_on, id],
                (err,result,field)=>{
                res.send({success:true,data: result})
            })
        
        }else {
            res.send({success:false, msg:'email Does Exist'})
        }
    })
})

router.put('/customer/:id',upload.single('photo'),auth, (req,res)=>{
    const {first_name, last_name, email, password} =req.body
    const {id} = req.params
    const photo = (req.file.filename)
    const enc_pass = bcrypt.hashSync(password);
    const updated_on = new Date()
    const sql = `SELECT email from tbl_users WHERE email =?`
    mysql.execute(sql, [email], (err,result1, field)=>{
        if(result1 == ''){
            mysql.execute(edit_user,
                [first_name, last_name, email, enc_pass, photo, '2', updated_on, id],
                (err,result,field)=>{
                res.send({success:true,data: result})
            })
        
        }else {
            res.send({success:false, msg:'email Does Exist'})
        }
    })
})

//DELETE
router.delete('/:id', auth, (req,res)=>{
    const {id} = req.params
    mysql.execute(delete_user,
        [id],(err,result,field)=>{
            res.send({success:true,data:result})
        })
})
module.exports =router