let jwt=require("jsonwebtoken");

module.exports=function (req,res,next){
let token=req.header("token");

if(!token){res.send("ACCESS DENIED")}

else{

try{
	const verified=jwt.verify(token,"LM10");
	req.body=verified;
	next();
}
catch(err){
	res.send("Invalid Token")
}
}
}