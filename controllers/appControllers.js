const Note = require("../models/appModel")


//GET notes

exports.getNotes = async(req, res, next)=>{

    if(!req.user){
        return res.status(401).json({message:'unauthorised'})
    } 
    
    try{
        const note = await Note.find({user_id:req.user.id})
        res.status(200).json({note})
    }catch(err){
        return  res.status(404).json({message:'couldnt find any notes, possible reasons: accessToken not authorized'})
    }
}

//POST  note
exports.postNote = async(req, res, next)=>{
    const {title, description } = req.body


        if(!title || !description ) {
            return  res.status(400).json({message:'all fields are mandatory'})
        }

    if(!req.user){
            return res.status(401).json({message:'unauthorised'})
    } 
   
    try{
        const newNote = await Note.create({
            title,
            description,
            user_id : req.user.id
        })

        res.status(200).json({note:newNote})
    }
    catch(err){
        return res.status(400).json({message:'something went wrong'})
    }
}

//GET notes
exports.getNote = async(req, res, next)=>{

    if(!req.user){
           return  res.status(403).json('unauthorized')
    }
    try{
        const note = await Note.findById(req.params.id)
        if(note) res.status(200).json(note)
        else throw new Error('cant find any such note')
    }
    catch(err){
        return res.status(401).json({message:'cant find any such note'})
    }
}

//DELETE note
exports.deleteNote = async(req, res, next)=>{
    if(!req.user){
           return  res.status(403).json({message:'unauthorized'})
    }

    try{
        const NoteId = req.params.id
        await Note.findByIdAndDelete(NoteId)
        res.status(200).json({message:`note  deleted for ${req.params.id}`})
    }
    catch(err){
            res.status(401).json({message:'cant find any such note'})
    }
}

//PUT note
exports.updateNote = async(req, res, next)=>{

    if(!req.user){
          return  res.status(403).json({message:'unauthorized'})
    }

    try{
        const noteId = req.params.id
        const updatedNote = await Note.findByIdAndUpdate(noteId,req.body,{new:true})
        res.status(200).json({message:`note  updated for ${updatedNote}`})
    }
    catch(err){
            res.status(401).json({message:'cant find any such note'})
    }
}