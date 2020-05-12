let jwt=require("jsonwebtoken");

module.exports=function (req,res,next){
let token=req.header("token");

if(!token){res.send("ACCESS DENIED")}
else{
try{
	if(jwt.verify(token,"LM10"))
	{
	next();
	}
}
catch(err){
	res.send("Invalid Token")
}
}
}