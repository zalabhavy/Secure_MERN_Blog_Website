import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import axios from "axios";
import jwt from 'jsonwebtoken';

class AuthController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authModel.findOne({ email });
        if (!isUser) {
          // Password hashing
          const genSalt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, genSalt);

          const newUser = new authModel({
            username,
            email,
            password: hashedPassword,
          });

          const savedUser = await newUser.save();
          if (savedUser) {
            return res.status(200).json({ message: "User Registration Successfully" });
          }
        } else {
          return res.status(400).json({ message: "Email Already Exists" });
        }
      } else {
        return res.status(400).json({ message: "All Fields are Required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // User Login (Step 1: Login and OTP Sending)
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isEmail = await authModel.findOne({ email });
        
        if (isEmail) {
          const isPasswordMatch = await bcryptjs.compare(password, isEmail.password);
          if (isPasswordMatch) {
            // Generate OTP using Depooye API
            const otpGenerationResponse = await axios.post(
              "https://email-otp-rest-api.onrender.com/api/generate",
              { email } 
            );

            if (otpGenerationResponse?.data) {
              return res.status(200).json({
                message: "OTP Sent to your email. Please verify the OTP.",
              });
            } else {
              return res.status(400).json({ message: "Failed to send OTP" });
            }
          } else {
            return res.status(400).json({ message: "Wrong Credentials" });
          }
        } else {
          return res.status(400).json({ message: "Email not found" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      console.error('Error during OTP generation:', error.response ? error.response.data : error.message);
      return res.status(400).json({ message: error.response?.data?.message || error.message });
    }
  };

  // OTP Verification
  static verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
      if (!email || !otp) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const otpVerificationResponse = await axios.post(
        "https://email-otp-rest-api.onrender.com/api/verify",
        { email, otp }
      );

      if (otpVerificationResponse?.data) {
        const isEmail = await authModel.findOne({ email });

        const token = jwt.sign(
          { userId: isEmail._id },
          "Bhavy_Zala",
          { expiresIn: "2d" }
        );
        return res.status(200).json({ 
          message: "OTP verified successfully.",
          token,
          name: isEmail.username
        });
      } else {
        return res.status(400).json({ message: otpVerificationResponse?.data?.message || "Invalid or expired OTP." });
      }
    } catch (error) {
      console.error('Error during OTP verification:', error.response ? error.response.data : error.message);
      return res.status(400).json({ message: error.response?.data?.message || error.message });
    }
  };
}

export default AuthController;
