const User=require("../models/user")
const generateJWT=require("../helper/generateJWT")
const generateId=require('../helper/generateId')

const register= async (req, res)=>{
    const {code}=req.body
    const userExist= await User.findOne({code})

    if(userExist){
        const error= new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }

    try {
        const user= new User(req.body)
        user.token=generateId();
        const savedUser= await user.save()
    res.json(savedUser)

    } catch (error) {
        console.log(error)
    }
}

const authenticate =async (req, res)=>{
    
    const {code, password} =req.body;
    //buscar usuario
    const user = await User.findOne({code});
    if (!user){
        const error= new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }
    //si tiene cona cuenta activada
    if (!user.active){
        const error= new Error('tu cuenta esta desactivada')
        return res.status(404).json({msg: error.message})
    }
    if (await user.checkPassword(password)){
        res.json({
            _id: user._id,
            code: user.code,
            token: generateJWT(user._id),
        })
    }else{
        const error= new Error('Contraseña incorrecta')
        return res.status(404).json({msg: error.message})
    }

}

const confirm = async (req, res)=>{
    const {token}=req.params;
    const confirmUser= await User.findOne({token})
    if(!confirmUser){
        const error= new Error("Token invalido")
        return res.status(403).json({msg: error.message})

    }

    try {
        
    } catch (error) {
        console.log(error)
    }
}

const profile =async (req, res)=>{
    const {user}= req
    res.json(user)
}

module.exports= {register, authenticate, confirm, profile};
