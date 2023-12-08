const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    const authHeader= req.headers.authorization
    if(authHeader==undefined){
        res.status(401).send({error:"no token provided"})
    }
    const token =authHeader.split(" ")[1]
    jwt.verify(token,"secret",function(err){
        if(err){
            res.status(500).send({error:"authentication failed"})
        }
        else{
            next()
        }
    })
}
module.exports={
    verifyToken
}

