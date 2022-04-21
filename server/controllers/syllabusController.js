const Syllabus=require("../models/syllabus")

const add= async (req, res)=>{   
    try {
        const syllabus= new Syllabus(req.body)
        const savedsyllabus= await syllabus.save()
    res.json(savedsyllabus)

    } catch (error) {
        console.log(error)
    }
}
const update =async (req, res)=>{
    
    const {_id, title} =req.body;
    //buscar programa
    const syllabus = await Syllabus.findOne({_id});
    if (!syllabus){
        const error= new Error('El programa de estudios no existe')
        return res.status(404).json({msg: error.message})
    }else{
        await Syllabus.findOneAndUpdate({_id}, { title})
        res.json(
            "Datos del programa de estudio actualizados"
        
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
