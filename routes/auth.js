const authController = require("../controllers/AuthController")

const router = require("express").Router()

router.get("/", authController.getAllUser)
router.post("/login", authController.signIn)
router.post("/", authController.createUser)
router.put("/", authController.updateUser)
router.delete("/", authController.deleteUser)

module.exports = router