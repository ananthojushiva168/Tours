const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true

    },
    password:{
        type:String,
        required:true
    },
    
},
{timestamps:true}   
)


userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

const User = new mongoose.model("Users", userSchema)

module.exports = User