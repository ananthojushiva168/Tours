const Review = require("../models/reviews");
const Tours = require("../models/tours");






exports.CeateReview = async (req, res) => {
    console.log("hello");
    try {
        const tokenid =req.headers.authorization  
        const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())
        const tours = await Tours.findById(req.params.id)
        if(!tours){
            res.status(401).json({
                message:"no tour found"
            })
        }
    

        const review = await Review.create({
            Tourreview: "" + req.params.id + tokenId.id,
            user: tokenId.id,
            TourId:req.params.id,
            name:tokenId.name,
            review: req.body.review,
            rating: req.body.rating,
        })
        res.status(200).send({
            status: "success",
            data: {
                data: review
            }
        }) 

        
     } catch (error) {
            res.status(500).json({
            status: "fail",
            message: 'failed to create review',
            error: error.message
        })
    }

}


exports.getReviewById = async (req,res)=>{
    try {
     const review = await Review.findById(req.params.id)
        if(!review){
         return  res.status(401).json({
                message:"no review found with given id"
            })
        }
       res.status(200).json({
        status:"success",
        data:{
            data: review
        }
       }) 
    } catch (error) {
        return  res.status(401).json({
            message:"no review found with given id",
            error:error
        })
    }
}

exports.getAllReviews = async (req,res)=>{
    try {
        const reviews = await Review.find()
        if (!reviews) {
            return  res.status(401).json({
                message:"no one reviewed yet"
            })
        }

        res.status(200).json({
            status:"success",
            data:{
                data:reviews
            }
        })
    } catch (error) {
        res.status(400).json({
            message:'failed',
            error:error
        })
    }
}


exports.updateReview = async (req,res)=>{
    try {
        const tokenid =req.headers.authorization  
        const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())
       
        const review = await Review.findById(req.params.id) 
        
        if (tokenId.id == review.user) {
            const updateReview = await Review.findByIdAndUpdate(req.params.id, 
                {
                    review:req.body.review,
                    rating:req.body.rating,
                },
                {
                new:true,
                runValidators: true,
            }) 
            res.status(200).json({
                status:"success",
                data: updateReview
            })
        } else{
            res.status(401).json({
                message:"This review dose not belong to you",
            })
        }
        
    } catch (error) {
        res.status(401).json({
            message:"failed",
            error:error
        })
    }
}

exports.deleteReview = async (req,res)=>{
    try {
        const tokenid =req.headers.authorization  
        const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())
       
        const review = await Review.findById(req.params.id) 
        
        if (tokenId.id == review.user) {
            const updateReview = await Review.findByIdAndDelete(req.params.id) 
            res.status(200).json({
                status:"successfully deleted",
            })
        } else{
            res.status(401).json({
                message:"failed to delete",
                error:error 
            })
        }
        
    } catch (error) {
        res.status(401).json({
            message:"failed to delete",
            error:error
        })
    }
}

exports.getReviewbyTourId = async (req, res)=>{

    try {
        const review = await Review.find()

    const tourReview = await review.map((item)=>{
       
        const{TourId,review,rating} = item
        if(req.params.id == TourId){
            return res.status(200).json({
                message:true,
                TourId,
                review,
                rating,
            })
        } else {
            res.status(401).json({
                message: false
            })
        }
    })
    } catch (error) {
        res.status(500).json({
            error:error.message,
            msg:"some thing went wrong"
        })
    }
    
}