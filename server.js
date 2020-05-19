let express=require("express");
let cors=require("cors");
let mysql=require("mysql");
let bodyparser=require("body-parser");
let userdetails=require("./Routes/userdetails");
let login=require("./Routes/login");
let address=require("./Routes/address");
let orders=require("./Routes/orders");
let register=require("./Routes/register");
let path=require("path");

const port=process.env.PORT || 8080;

let app=express();
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

let connection=mysql.createConnection({
    host:"db4free.net",
    user:"foodies12345",
    password:"abinash12345",
    database:"foodies"
});

app.use("/userDetails",userdetails);
app.use("/login",login);
app.use("/address",address);
app.use("/orders",orders);
app.use("/register",register);

app.get("/getData",(req,res)=>{
    connection.query(`select hotels.hotel_id,hotel_name,id,item_name,item_price,item_total,item_count,incart,item_type,item_subtype from hotels,${req.query.menu} where hotels.hotel_id = ${req.query.menu}.hotel_id;`,
                                        (err,records,feilds)=>{
                                            if (err){
                                                console.log(err);
                                              res.send("CANNOT CONNECT TO DATABASE");
                                            }
                                            else{
                                                res.send(records)
                                            }
                                        })
})
app.get("/getHotels",(req,res)=>{
    connection.query(`select * from hotels`,
    (err,records,feilds)=>{
        if (err){
          res.send("CANNOT CONNECT TO DATABASE");
        }
        else{
            res.send(records)
        }
    })
})




if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'client' , 'build' ,'index.html'));
    })
}


app.listen(port,()=>{
    console.log("server running on port number 8080");
})
