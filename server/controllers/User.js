const User = require("../models/users");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signToken = (id,name)=>{
    return jwt.sign({id,name},"hello-world",{
        expiresIn:"30d"
    })
}

const createSendToken = (user, statusCode, res)=>{
    const token = signToken(user._id, user.name)
//     const cookieOptions = {
//             expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//             httpOnly:true
//     }
//   res.cookie("jwt", token, cookieOptions)

  user.password = undefined;
   return res.status(statusCode).json({
        status:"success",
        token,
        user
    })

}

exports.signup =  async (req,res)=>{
    try {
     
        const unuser = await User.findOne({"email": req.body.email})
        if (unuser) {
            return res.status(401).json({
                message:"failed  email already exists pls login with your account"
            })
        }

        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })  
        createSendToken(user, 201, res)
    } catch (error) {
        console.log(error);
    }
    
}

exports.Login = async(req,res)=>{
    try {
        const {email, password} = req.body

        if (!email || !password) {
          return res.status(401).json({
            status:"falied",
            message:"pls provide valid email and password"
          })  
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                status:"falied",
                message:"pls provide valid email and password"
              })
            }

          const newPassword =  await bcrypt.compare(password, user.password)
            
        if (newPassword) {
            return createSendToken(user, 201, res)
            } else{
            res.status(401).json({
            status:"fail",
            message:"please provide vaild password and email"
        })}
    } catch (error) {
        console.log(error)
    }
}

exports.verifyToken = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }  else {
          // Forbidden
     return res.status(403).json({
        message: "please login with your credentials"
     });
    }
    jwt.verify(token, "hello-world", (err) =>{
        if(err) return res.status(400).json({msg: "Please Login or Register"})        
    })
    next()
  }