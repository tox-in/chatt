const userModel = require("../Models/userModel"); 
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const createToken =  (_id) => {
        const jwtkey = 'mysecrettsupernumbernidanjyerkolo4563' ;

      return jwt.sign({_id}, jwtkey, {expiresIn: "7d" });
};

const registerUser = async(req, res) => {
        const {name, email, password} = req.body;

        try{
                       
                let user =  await userModel.findOne({ email });
         
                if(user) 
                return res.status(400).json({ error: "The email is already in our system.."});
         
                if(!name || !email || !password) 
                return res.status(400).json("All field are required..");
         
              
         
                user = new userModel({name, email, password})
         
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
         
                await user.save();
         
                const token = createToken(user._id);
         
                res.status(200).json({_id: user._id, name, email, token});
        }
        catch(error) {
                console.log(error);
                res.status(500).json({error: error.message});
        }

};

const loginUser = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            let user = await userModel.findOne({ email });
    
            if (!user) {
                return res.status(400).json({ error: "Invalid email or password. Please check your credentials." });
            }
    
            const isValidPassword = await bcrypt.compare(password, user.password);
    
            if (!isValidPassword) {
                return res.status(400).json({ error: "Invalid password. Please check your credentials." });
            }
    
            const token = createToken(user._id);
    
            res.status(200).json({ _id: user._id, name: user.name, email, token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    };
    
const findUser = async(req,res) =>{
        const userId = req.params.userId;

        try{
                const user = await userModel.findById(userId);
                res.status(200).json(user);
        } 

        catch(err) {
                console.log(error);
                res.status(500).json(error);
         }
};

const getUsers = async(req,res) =>{

        try{
                const users = await userModel.find();

                res.status(200).json(users);

        } 

        catch(err) {
                console.log(error);
                res.status(500).json(error);
         }
}

module.exports = { registerUser, loginUser, findUser, getUsers};

