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
    const link = await Link.findOne({_id});
    if (!link){
        const error= new Error('El enlace no existe')
        return res.status(404).json({msg: error.message})
    }else{
        await Link.findOneAndUpdate({_id}, { active})
        res.json(
            "el estado ha sido cambiado a '"+ active+"'"
        
        )
    }
}
const all =async (req,res)=>{
    Link
        .find()
        .then(allLinks => res.json(allLinks))
}
const actived =async (req,res)=>{
    Link
        .find({"active":true})
        .then(allLinks => res.json(allLinks))
}
const unactived =async (req,res)=>{
    Link
        .find({"active":false})
        .then(allLinks => res.json(allLinks))
}




module.exports= {add, activate, actived, unactived, all};
