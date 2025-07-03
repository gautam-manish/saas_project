/*
    
    REGISTER/SIGNUP
    incoming data --> username, email, password
    processing/checking --> check if user exists, hash password   

    LOGIN/SIGNUP
    LOGOUT
    FORGOT PASSWORD
    RESET PASSWORD/OTP

*/

import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/*
const registerUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // const { username, email, password } = req.body;

  if(!username || !email || !password) {
    res.status(400).json({
         message: "All fields are required" 
  });
  }else {
    // insert into Users table
    await User.create({
        username: username,
        email: email,
        password: password // Note: Password should be hashed before storing
    })
    res.status(200).json({
      message: "User registered successfully",
    });
  }
};
*/

class AuthController {
  static async registerUser(req: Request, res: Response) {
    if(req.body==undefined ) {
      res.status(400).json({
        message: "No data was sent",
      });
      return;
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
    } else {
      // insert into Users table
      await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 12)// Note: Password should be hashed before storing // hasing uses blowfish algorithm
      });
      res.status(201).json({
        message: "User registered successfully",
      });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const {email, password} = req.body;
    if(!email || !password) {
      res.status(400).json({
        message: "Please provide email and password",
      });
      return;
    }
    const data = await User.findAll({
      where:{
        email : email
      }
    })
    if(data.length === 0) {
      res.status(404).json({
        message: "User not found",
      });
      
    }else{
      const isPasswordMatch = bcrypt.compareSync(password, data[0].password)
      if(isPasswordMatch) {
        // login vayo, token generate garne
        const token = jwt.sign({id : data[0].id}, "this_is_a_secret_key",{
          expiresIn: "20d"
          
        })
        res.json({
          token : token,
          message : "Login successful"
          
        })
      } else {
        res.status(401).json({
          message: "Credentials didn't match", 
        });
      }
    }
  }
}

export default AuthController;
