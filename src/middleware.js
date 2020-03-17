const jwt = require ('jsonwebtoken')
const mysql = require ('./dbconfig')

const auth = (req,res,next)=>{
    if(
        req.headers['authorization'] && 
        req.headers['authorization'].startsWith('Bearer')
        ){
            const jwt_token = req.headers['authorization'].substr(7)
            req.headers.auth_token=jwt_token
            mysql.execute('SELECT token FROM revoked_token where token=? and is_revoked=1',[jwt_token],
            (err,result, field)=>{
                if(err){
                    res.send({
                        success:false,
                        msg: err
                    })
                }else{
                    if(result.length > 0){
                        res.send({
                            success:false,
                            msg: 'token expired'
                        })
                    }else{
                        try{
                            const user=jwt.verify(jwt_token,process.env.APP_KEY)
                            next()
                        }catch(e){
                            res.send({success:false,msg:e})
                        }
                    }
                }
            })
        }else{
            res.send({success:false,msg:'you must be login first'})

        }
}
const admin = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '1'){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

const customer = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '1'|| id_role == '2'){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}
const all = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '1'|| id_role == '2'){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

module.exports = {auth, admin, customer, all}