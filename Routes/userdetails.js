let express=require("express");
let router=express.Router();
let mysql=require("mysql");
let verify=require("../Middlewares/verify.js")


let connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"foodies"
});

router.get("/",verify,(req,res)=>{
      connection.query(`select id,cust_name,phone_no,email,username from users where username="${req.body.uname}" or phone_no="${req.body.uname}"`,
              (err,records)=>{
                if(err){
                  console.log(err);
                  res.send("CANNOT CONNECT TO DATABASE");
                }
                else{
                  res.send(records);
                }
              })
});

router.get("/address",verify,(req,res)=>{
  connection.query(`select * from address where user_id=(select id from users where username="${req.body.uname}" or phone_no="${req.body.uname}" );`,
          (err,records)=>{
            if(err){
              console.log(err);
              res.send("CANNOT CONNECT TO DATABASE");
            }
            else{
              res.send(records);
            }
          })
});



module.exports = router;

