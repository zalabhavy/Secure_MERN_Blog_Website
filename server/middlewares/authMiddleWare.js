import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const { userId } = jwt.verify(token, "Bhavy_Zala");
            req.user = await authModel.findById(userId).select("-password"); 
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized User - Token is not valid" }); 
        }
    } else {
        return res.status(401).json({ message: "Unauthorized User - No token provided" }); 
    }
};

export default checkIsUserAuthenticated;
