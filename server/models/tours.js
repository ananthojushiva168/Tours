const mongoose = require("mongoose")

const geocoder = require("../utils/geocoder")


const Tourschema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    uploadedby:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    },
    images:[{
    image:{
        type:[String],
        required:true
    },
}],
    description:{
        type:String,
        required:true
    },
    postedBy:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true   
    },
    address:{
        type:String,
        required:[true, "please add an address"]
    },
    location: {
        type: { 
        type: String, 
        enum:['Point']
        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        },
        formattedAddress: String
    }  
},

{timestamps:true}   
)




Tourschema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type:"Point",
        coordinates:[loc[0].longitude, loc[0].latitude],
        formattedAddress:loc[0].formattedAddress
    }
    next()
})

// Tourschema.index({ "loc": "2dsphere" })
const Tours = mongoose.model("Tours", Tourschema)

module.exports = Tours;