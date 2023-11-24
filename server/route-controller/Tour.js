const Tours = require("../controllers/Tour")
const User = require("../controllers/User")

const router = require("express").Router()
router.route("/")
.get(Tours.getTours)
.post(User.verifyToken, Tours.CreateTour)


router.route("/:id")
.get(Tours.getById)
.patch(User.verifyToken, Tours.editData)
.delete(User.verifyToken,Tours.deleteData)

module.exports=router