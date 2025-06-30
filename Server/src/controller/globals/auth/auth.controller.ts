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
        password: bcrypt.hashSync(password, 12)// Note: Password should be hashed before storing
      });
      res.status(201).json({
        message: "User registered successfully",
      });
    }
  }
}

export default AuthController;
