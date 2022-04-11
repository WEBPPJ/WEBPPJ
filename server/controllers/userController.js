const User=require("../models/user")

const registrar= async (req, res)=>{
    const {code}=req.body
    const userExist= await User.findOne({code})

    if(userExist){
        const error= new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }

    try {
        const user= new User(req.body)
        const savedUser= await user.save()
    res.json(savedUser)

    } catch (error) {
        console.log(error)
    }
}

module.exports= registrar;