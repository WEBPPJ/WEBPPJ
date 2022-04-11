const jwt=require("jsonwebtoken")
const User= require("../models/user")

const checkAuth=async (req, res, next)=>{
    let token
    const SECRET="SECRET"
    console.log(req.headers['authorization'])
    if(
        req.headers['authorization'] &&
        req.headers['authorization'].startsWith("Bearer")
        
    ){
        try {
            token=req.headers['authorization'].split(" ")[1]

            const decoded= jwt.verify(token, SECRET)
            console.log(decoded)
            req.user=await User.findById(decoded.id).select("-password -active -token -__v")
            return next()
        } catch (error) {
            res.status(404).json({msg: "Hubo un error"})
        }
    }
    if(!token){
        const error=new Error("Token no valido")
    }

 
}

module.exports= checkAuth;