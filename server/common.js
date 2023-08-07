const jwt = require('jsonwebtoken');
const secret="57yrtgcjt6ui67it854";
const verifyToken=async (req,res,next)=>{
    if(req.headers.authorization){
        let token=req.headers.authorization
        if(token){
            const payload=await jwt.verify(token,secret)
            next();
        }
        else{
            return res.status(403).send("authorization error1");
        }
    }
    else{
        return res.status(403).send("authorization error2");
    }
    
}
module.exports={verifyToken,secret}