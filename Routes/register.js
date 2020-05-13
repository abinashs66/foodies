let express=require("express");
let router=express.Router();
let mysql=require("mysql");
let bcrypt=require("bcrypt");
const saltRounds=10;

let connection=mysql.createConnection({
    host:"db4free.net",
    user:"foodies12345",
    password:"abinash12345",
    database:"foodies"
});


router.post("/",(req,res)=>{

    bcrypt.hash(req.body.user_password,saltRounds,(err,hash)=>{
        connection.query(`insert into users(cust_name,username,user_password,phone_no,email)
                 values("${req.body.cust_name}","${req.body.username}","${hash}","${req.body.phone_no}","${req.body.email}")`,
        (err,result)=>{
            if (err){
                res.send(err)
            }
            else{
                res.send(result);
            }
        })
    })



})

module.exports = router;