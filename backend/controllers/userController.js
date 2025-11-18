import { sql } from "../config/db.js"
import bcrypt from "bcrypt";

export const createUser = async(req,res) => {
    const {username,password,confirmPass,email} = req.body
    const saltRounds = 10;
    if(password !== confirmPass){
        return res.status(400).json({success:false,message:"Password not match"})
     }
    if(!username || !password || !email){
        return res.status(400).json({success:false,message:"All fields are required"})
    }

    try {
        const findUser = await sql`
        SELECT * FROM users WHERE email = ${email}`

        if (findUser.length > 0){
            return res.status(409).json({success:false,message:"User exist"})
        }
        const hash = await bcrypt.hash(password,saltRounds)
            
            const newUser = await sql`
            INSERT INTO users (username,password,email) VALUES (${username},${hash},${email}) RETURNING id,username,email`
            console.log("new user added",newUser);
                    // Remove password from response
            const userWithoutPassword = { ...newUser[0] };
            delete userWithoutPassword.password;
            res.status(201).json({success:true,data:newUser[0]})       
    } catch (error) {
        console.log("Error in createUser function:",error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const getUser = async(req,res) => {
    const {email,password} = req.body

    if(!email|| !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"})
    }
    try {
        const findUser = await sql`
        SELECT * FROM users WHERE email = ${email}`
        
        //User not found
        if(findUser.length === 0){
            return res.status(404).json({
                success:false,message:"User not found"})
        }

        const user = findUser[0];
        const storedHashedPassword = user.password
        const isPasswordAValid = await bcrypt.compare(password,storedHashedPassword)
            if(isPasswordAValid){
                 // Remove password from response
                const userWithoutPassword = { ...user };
                delete userWithoutPassword.password;
                return res.status(200).json({
                success:true,
                message:"User found",
                data:userWithoutPassword})
                
            }else{
                 return res.status(400).json({
                success: false, 
                message: "Incorrect password"})
            }
    } catch (error) {
        console.log("Error in getUser function:",error);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}
