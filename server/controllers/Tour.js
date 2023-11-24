const Tours = require("../models/tours");
const path = require("path")
const cloudinary = require("cloudinary").v2
const fs = require("fs");
const Review = require("../models/reviews");

const geocoder = require("../utils/geocoder")



exports.CreateTour = async (req, res) => {
    try {

        const tokenid = req.headers.authorization
        const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())

        const arr = req.files.image
        let imageBox = []
        for (let index = 0; index < arr.length; index++) {

            const imageUrl = await cloudinary.uploader.upload(arr[index].tempFilePath, {
                use_filename: true,
                folder: 'file-upload'

            })
            // console.log(imageUrl)
            imageBox.push(imageUrl.secure_url)
        }

        console.log(imageBox)
        const tour = new Tours({
            title: req.body.title,
            uploadedby: tokenId.id,
            postedBy: tokenId.name,
            images: [{
                image: imageBox
            }],
            description: req.body.description,
            address: req.body.address,
            price: req.body.price
        });
        await tour.save()


        res.status(200).json({
            tour
        })


    } catch (error) {
        res.status(400).json({
            failure: error.message
        })
    }

}

exports.getTours = async (req, res) => {
    try {
        const tour = await Tours.find()


        res.status(200).json({
            status: "success",
            data: tour
        })
    } catch (error) {
        res.status(400).json({
            failure: error
        })
    }
}

exports.editData = async (req, res) => {
    try {
        const tokenid = req.headers.authorization
        const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())

        const tours = await Tours.findById(req.params.id)


        if (!tours) {
            return res.status(400).json({
                message: "no tour find the requested id"
            })
        }

        if (tokenId.id == tours.uploadedby) {

            if (req.files) {
                const arr = req.files.image
                let imageBox = []
                for (let index = 0; index < arr.length; index++) {

                    const imageUrl = await cloudinary.uploader.upload(arr[index].tempFilePath, {
                        use_filename: true,
                        folder: 'file-upload'

                    })
                    // console.log(imageUrl)
                    imageBox.push(imageUrl.secure_url)
                }   
                
                const loc = await geocoder.geocode(req.body.address);
                const location = {
                    type:"Point",
                    coordinates:[loc[0].longitude, loc[0].latitude],
                    formattedAddress:loc[0].formattedAddress
                }

                const tour = await Tours.findByIdAndUpdate(req.params.id, {
                    title: req.body.title,
                    description: req.body.description,
                    address: req.body.address,
                    images: [{
                        image: imageBox
                    }],
                    location: {
                        coordinates:location.coordinates,
                        formattedAddress: location.formattedAddress
                    },
                    price: req.body.price

                }, {
                    new: true,
                    runValidators: true,
                })
                res.status(200).json({
                    status: "success",
                    data: {
                        data: tour
                    }
                })

            } else {
                const loc = await geocoder.geocode(req.body.address);
                const location = {
                    type:"Point",
                    coordinates:[loc[0].longitude, loc[0].latitude],
                    formattedAddress:loc[0].formattedAddress
                }
                const tour = await Tours.findByIdAndUpdate(req.params.id, {
                    title: req.body.title,
                    description: req.body.description,
                    address: req.body.address,
                    location: {
                        coordinates:location.coordinates,
                        formattedAddress: location.formattedAddress
                    },
                    price: req.body.price

                }, {
                    new: true,
                    runValidators: true,
                })
                res.status(200).json({
                    status: "success",
                    data: {
                        data: tour
                    }
                })
            }
            // if (req.files) {
            //     fs.unlinkSync(req.files.image.tempFilePath)
            // }


        } else {
            return res.status(401).json({
                status: "this not belongs to you",
            })
        }
    } catch (error) {
        res.status(404).json({
            failure: error.message,
            mes: {
                mes: "something went wrong"
            }
        })
    }
}


exports.getById = async (req, res) => {
    try {
        const tour = await Tours.findById(req.params.id)
        if (!tour) {
            return res.status(401).json({
                message: "not found the tour"
            })
        }
        // const reviews = await Review.find()
        const Id = req.params.id
        const stats = await Review.aggregate([
            {
                "$match": { "TourId": `${Id}` }
            },
        ]);



        var total = 0;
        for (let index = 0; index < stats.length; index++) {
            total += stats[index].rating
        }

        const averageRating = (total * 5) / (stats.length * 5)
        const singledecimal = Math.round(averageRating * 10) / 10


    

        res.status(200).json({
            status: "success",
            data: tour,
            tourReview: stats,
            avg: singledecimal
        })
    } catch (error) {
        res.status(404).json({
            failure: error.message,
            mes: {
                mes: "something went wrong"
            }
        })
    }
}

// exports.deleteData = async (req, res) => {
//     try {
//         const tokenid = req.headers.authorization
//         const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())

//         const touruser = await Tours.findById(req.params.id)
//         if (!touruser) {
//             return res.status(404).json({
//                 data: {
//                     data: "not found the tours"
//                 }
//             })
//         }

//         console.log(touruser.uploadedby);
//         console.log(tokenId.id);
//         if (tokenId.id == touruser.uploadedby) {
//             // const imageid = touruser.imageId
          
//             // await cloudinary.uploader.destroy(imageid)

//             const tours = await Tours.findByIdAndDelete(req.params.id)

//             res.status(200).json({
//                 status: "success",
//                 data: {
//                     data: "sucessfull deleted the tour"
//                 }
//             })
//         } else {
//             res.status(401).json({
//                 status: "failed",
//                 data: {
//                     message: "you have no authority to delete this tour"
//                 }
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: {
//                 error
//             }
//         })
//     }


// }


exports.deleteData = async (req, res) => {
    try {
        const tokenid = req.headers.authorization
        const tokenId = JSON.parse(Buffer.from(tokenid.split('.')[1], 'base64').toString())

        const touruser = await Tours.findById(req.params.id)
        if (!touruser) {
            return res.status(404).json({
                data: {
                    data: "not found the tours"
                }
            })
        }

        // console.log(touruser.uploadedby);
        // console.log(tokenId.id);
        if (tokenId.id == touruser.uploadedby) {
            
            const Id = req.params.id
            const stats = await Review.aggregate([
                {
                    "$match": { "TourId": `${Id}` }
                },
            ]);
            let arr = []
            stats.map((item)=>{
                const{_id} = item
                arr.push(_id)
            })
            // const getPublicId = (imageURL) => imageURL.split("/").pop().split(".")[0];

            // await cloudinary.uploader.destroy(imageid)
               await Review.deleteMany({_id:{$in:arr}})
            const tours = await Tours.findByIdAndDelete(req.params.id)

            res.status(200).json({
                status: "success",
                data: {
                    data: "sucessfull deleted the tour"
                }
            })
        } else {
            res.status(401).json({
                status: "failed",
                data: {
                    message: "you have no authority to delete this tour"
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            message: {
                error
            }
        })
    }


}