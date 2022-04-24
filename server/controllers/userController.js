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
    //si tiene una cuenta activada
    if (!user.active){
        const error= new Error('tu cuenta esta desactivada')
        return res.status(404).json({msg: error.message})
    }
    if (await user.checkPassword(password)){
        res.json({
            _id: user._id,
            code: user.code,
            role: user.role,
            token: generateJWT(user._id),
        })
    }else{
        const error= new Error('Contraseña incorrecta')
        return res.status(404).json({msg: error.message})
    }

}
const update =async (req, res)=>{
    
    const { code, role} =req.body;
    //buscar usuario
    const user = await User.findOne({code});
    if (!user){
        const error= new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }else{
        await User.findOneAndUpdate({code}, {role})
        res.json(
            "Rol del usuario actualizado"
        
        )
    }
    

}
const password =async (req, res)=>{
    
    const { code} =req.body;
    //buscar usuario
    const user = await User.findOne({code});
    if (!user){
        const error= new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }else{
        const password='password'
        await User.findOneAndUpdate({code}, {password})
        res.json(
            "Contraseña del usuario actualizada"
        
        )
    }
    

}
const activate =async (req, res)=>{
    
    const { code,  active} =req.body;
    //buscar usuario
    const user = await User.findOne({code});
    if (!user){
        const error= new Error('El usuario no existe')
        return res.status(404).json({msg: error.message})
    }else{
        await User.findOneAndUpdate({code}, { active})
        if (active=true){
            res.json(
                "el estado ha sido cambiado a 'activo'"
            )
        }else{
            res.json(
                "el estado ha sido cambiado a 'inactivo'"
            )
        }
    }
}
const all =async (req,res)=>{
    User
        .find()
        .then(allUsers => res.json(allUsers))
}


const profile =async (req, res)=>{
    const {user}= req
    res.json(user)
}

module.exports= {register, authenticate, update, password, activate, all, profile};
