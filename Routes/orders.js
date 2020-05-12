let express=require("express");
let router=express.Router();
let mysql=require("mysql");
let verifyOrder=require("../Middlewares/verifyOrders");

let connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"foodies"
});

router.post("/placeorder",verifyOrder,(req,res)=>{
    connection.query(`insert into orders(customer_name,user_order,price,address,order_time,order_date,phone_number,extra_number,user_id)
                       values("${req.body.customer_name}","${req.body.user_order}",${req.body.price},"${req.body.address}",curtime(),curdate(),"${req.body.phone_number}","${req.body.extra_number}",${req.body.user_id});`,
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