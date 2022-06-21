const User = require("../models/User");
const userController = {};

userController.getAll = async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            message: 'Get all users retrivered successfully',
            data: users
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retriving users: ',
            error: error.message
        })
    }
};

userController.post = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //<------- Otra forma de hacerlo ------>
        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;

        const newUser = {name, email, password};
        await User.create(newUser);
        return res.status(200).json({
            success: true,
            massage: 'Create user successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating users: ',
            error: error?.message || error
        })
    }
};

userController.getUserById = async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: true,
                message: "User not found",
                data: []
            })
        };

        return res.status(200).json({
            success: true,
            message: "User found",
            data: user
            })
    }catch (error){
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json({
                success: true,
                message: "User not found"
            })
        };
        return res.status(500).json({
            success: false,
            message: "User not found",
            data: error?.message || error
        })

    }
}

module.exports = userController;