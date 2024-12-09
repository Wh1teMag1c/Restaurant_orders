import {createUser, findUserByEmail} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Создание токена
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
};

// Логин пользователя
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({success: false, message: "User doesn't exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = createToken(user.id);
        res.json({success: true, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error"});
    }
};

// Регистрация пользователя
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const exists = await findUserByEmail(email);
        if (exists) {
            return res.status(400).json({success: false, message: "User already exists."});
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: "Please enter a valid email."});
        }

        if (password.length < 8) {
            return res.status(400).json({success: false, message: "Please enter a strong password."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await createUser({name, email, password: hashedPassword});
        const token = createToken(newUser.id);
        res.json({success: true, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Error"});
    }
};

export {loginUser, registerUser};
