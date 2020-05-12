let express=require("express");
let router=express.Router();
let jwt=require("jsonwebtoken");
let mysql=require("mysql");
let bcrypt=require("bcrypt");


let connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"foodies"
});

router.post("/",(req,res)=>{
    let uname=req.body.uname;
    let upass=req.body.upass;

	connection.query(`select phone_no,username,user_password from users where username="${uname}" or phone_no="${uname}"`,
			async (err,records)=>{
					if(err){
            res.send("CANNOT CONNECT TO DATABASE");
          }
					else
  					{
            if(records[0]!=null)
            {       
                  const hash=records[0].user_password;
                  const result=await bcrypt.compare(upass,hash);

						      if((records[0].username==uname||records[0].phone_no==uname) && result==true)
                      {
							                   jwt.sign({"uname":uname},"LM10",(err,token)=>{
							                     if(err)
                                   {
                                     res.send("TRY AGAIN")
                                   }
							                            else
                                          {         
								                                    res.send({"token":token});
								                             }
								       })
					             }
                                else{
                                    res.send("TRY AGAIN");
                                    }
              }

              else{
                  res.send("TRY AGAIN");
              }
					}


				})
})

module.exports = router;