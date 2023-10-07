const jwt = require('jsonwebtoken')

const ValidateToken = (req,res,next)=>{

        const token = req.headers.Authentication || req.headers.authentication
        console.log(token)

        if(token && token.startsWith('Bearer')){
            const accessToken = token.split(' ')[1]

            try{
                const decoded = jwt.verify(accessToken,process.env.SECRET)
                req.user = decoded.user
            }catch(error){
               return res.status(403).json('unauthorized, invalid json web token',error)
            }
        }
        else{
            return res.status(403).json({message:'no access token provided'})
        }
    next()
}

module.exports = ValidateToken