const User = require("../controllers/User")



const router = require("express").Router()


router.route("/signup").post(User.signup)
router.route("/login").post(User.Login)

module.exports=router