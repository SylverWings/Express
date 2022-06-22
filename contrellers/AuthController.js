const User = require("../models/User");
const bcrypt = require("bcrypt");

const authController = {};

authController.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //<------- Otra forma de hacerlo ------>
        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;
        
        //<---------- codificar password ------->
        const salt = bcrypt.genSaltSync(10);
        const encryptPassword = await bcrypt.hash(password, salt);
        console.log(encryptPassword);

        const newUser = {
            name, 
            email, 
            password: encryptPassword
        };

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

module.exports = authController;