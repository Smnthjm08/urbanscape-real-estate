const userModel = require("./models/userModel");
const bcrypt = require("bcryptjs");

//register call back
const loginController = async (req, res) => {
    try {
        const existingUser = await userModel.findone({email: req.body.email});

        if (existingUser){
            res.status(200).send({success:false, message: "User Already Exists"})
        }
        
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:"Registration Successfully", success:"true"})

    } catch {
        console.log(error);
        res.status(500).send({success:false, message: `Register Controller ${error.message}`})
    }
}

const registerController = () => {}

module.exports = {loginController, registerController};