const Review  = require("../controllers/Review")
const User = require("../controllers/User")

const router = require("express").Router()


router.route("/:id").post(User.verifyToken, Review.CeateReview)
.get(User.verifyToken, Review.getReviewById)
.patch(User.verifyToken, Review.updateReview)
.delete(User.verifyToken, Review.deleteReview)

router.route("/").get(Review.getAllReviews)

router.route("/tour/:id").get(Review.getReviewbyTourId)


module.exports = router




