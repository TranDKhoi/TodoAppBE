const { User } = require("../models/User")


const authController = {

    createUser: async (req, res) => {

        const value = req.body

        const isExists = await User.find({ "username": value.username })
        if (isExists.length === 1) {

            res.status(400).json("Username already exists")
            return
        }

        try {
            const newUser = new User(req.body)
            const save = await newUser.save()
            res.status(200).json({
                message: "Create successful",
                data: save
            })

        } catch (e) {
            res.status(500).json(e)
        }
    },

    getAllUser: async (_, res) => {

        try {
            const users = await User.find()
            res.status(200).json({
                message: 'getAllUser',
                data: users
            })

        } catch (e) {
            res.status(500).json(e)
        }
    },

    updateUser: async (req, res) => {

        const isExist = await User.find({ "username": req.body.username })

        if (isExist.length === 0) {
            res.status(400).json("Username does not exists!")
            return
        }

        try {
            await User.updateOne({ "username": req.body.username }, req.body)
            res.status(200).json("success update")
        } catch (e) {
            res.status(500).json(e.message)
        }
    },

    deleteUser: async (req, res) => {


        const isExist = await User.find({ "username": req.body.username })

        if (isExist.length === 0) {
            res.status(400).json("Username does not exists!")
            return
        }

        try {
            await User.deleteOne({ "username": req.body.username })
            res.status(200).json("success delete")
        } catch (e) {
            res.status(500).json(e.message)
        }

    },

    signIn: async (req, res) => {

        const isExist = await User.find({ "username": req.body.username, "password": req.body.password })

        if (isExist.length === 0) {
            res.status(400).json({
                message: "Username or password is incorrect!",
                data: null
            })
            return
        }

        return res.status(200).json({
            message: "Login Success",
            data: isExist[0]
        })
    }
}

module.exports = authController