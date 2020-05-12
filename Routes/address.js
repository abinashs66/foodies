let express=require("express");
let router=express.Router();
let mysql=require("mysql");
let deleteAddress=require("../Middlewares/deleteAddress.js");
let addAddress=require("../Middlewares/addAddress.js")

let connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"foodies"
});

router.delete("/deleteAddress",deleteAddress,(req,res)=>{
        connection.query(`delete from address where id=${req.body.id}`,
        (err,result)=>{
            if(err){
                res.send("CANNOT CONNECT TO DATABASE")
            }
            else{
                res.send(result);
            }
        })
})

router.post("/addAddress",addAddress,(req,res)=>{
    connection.query(`insert into address(add_type,user_address,user_id) values("${req.body.addType}","${req.body.address}",${req.body.id});             `,
    (err,result)=>{
        if(err){
            res.send("CANNOT CONNECT TO DATABASE")
        }
        else{
            res.send(result);
        }
    })
})

module.exports = router;