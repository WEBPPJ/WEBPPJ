const Syllabus=require("../models/syllabus")

const add= async (req, res)=>{   
    const {title}=req.body
    const syllabus= await Syllabus.findOne({title})
    if(syllabus){
        const error= new Error('El nombre del programa ya se ha registrado')
        return res.status(400).json({msg: error.message})
    }
    try {
        const syllabus= new Syllabus(req.body)
        const savedsyllabus= await syllabus.save()
    res.json(`Plan ${title} agregado correctamente`)

    } catch (error) {
        console.log(error)
    }
}
const update =async (req, res)=>{
    
    const {_id, title} =req.body;
    //buscar programa
    const syllabus = await Syllabus.findOne({title});
    if (syllabus){
        const error= new Error('El nombre del programa ya se ha registrado')
        return res.status(404).json({msg: error.message})
    }else{
        await Syllabus.findOneAndUpdate({_id}, { title})
        res.json(
            `Plan ${title} actualizado correctamente`

        
        )
    }
    

}

const remove =async (req, res)=>{
    const {_id} =req.body;
    await Syllabus.findOneAndDelete({_id})
    res.json(
        "El programa de estudios se ha eliminado"
    
    )
}


const all =async (req,res)=>{
    Syllabus
        .find()
        .then(allSyllabus => res.json(allSyllabus))
}




module.exports= {add, update, remove, all};
