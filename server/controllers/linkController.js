const Link=require("../models/Link")

const add= async (req, res)=>{   
    try {
        const link= new Link(req.body)
        const savedLink= await link.save()
    res.json(savedLink)

    } catch (error) {
        console.log(error)
    }
}




const activate =async (req, res)=>{
    
    const { _id,  active} =req.body;
    const user = await User.findOne({_id});
    if (!user){
        const error= new Error('El enlace no existe')
        return res.status(404).json({msg: error.message})
    }else{
        await User.findOneAndUpdate({_id}, { active})
        res.json(
            "el estado ha sido cambiado a '"+ active+"'"
        
        )
    }
}
const all =async (req,res)=>{
    User
        .find()
        .then(allUsers => res.json(allUsers))
}




module.exports= {add, activate, all};
