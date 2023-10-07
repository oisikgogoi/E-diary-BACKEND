const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerController = async(req,res,next)=>{
    const {username , email , password} = req.body

    if (!email || !password || !username) {
        return res.status(400).json({
            success:false,
            msg: 'all fields are mandatory' 
        });
    }


      const emailAvailable =  await User.findOne({email})
    // }catch(err){
    //     return res.status(400).json({
    //             success:false,
    //             msg:"email already taken"
    //         })
    // }
    if(emailAvailable){
        return res.status(400).json({
          success:false,
          msg:"email already taken"
         })
    }
    //hash password And saving user
    try{
        const hashedPass = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            email,
            password:hashedPass
        });

        await user.save();
        res.status(201).json({
            success:true,
            msg:"created",
            user
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            msg:"server error "
        })
    }
    

    
}

const loginController = async(req,res,next)=>{
    const { email , password} = req.body
    
    if (!email || !password ) {
        return res.status(401).json({ msg: 'all fields are mandatory' });
    }


    try{
    const user = await User.findOne({email})

     if(user && (await bcrypt.compare(password, user.password))){

            const accessToken = jwt.sign({
                user:{
                    username : user.username,
                    email : user.email,
                    id: user.id
                }
            },process.env.SECRET,{expiresIn:'8d'})

            res.status(200).json({accesstoken:accessToken})
        }
        else{
                throw new Error('wrong credentials')
        }
    }catch(err){
        return res.status(400).json({msg:err.message})
    }
}

module.exports = {registerController,loginController}

//add bycrypt 