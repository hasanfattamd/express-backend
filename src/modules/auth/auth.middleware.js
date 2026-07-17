import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils";
import User from "./auth.model.js";

const authenticate = (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.header.authorization.split(" ")[1];
    }
    if (!token) throw ApiError.unauthorized("Not authenticated");
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id)
    if (!user) throw ApiError("User does not exist.")
    req.user = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }
    next()
};

const authorize =  (...roles) => {
    return (req,res,next) => {
        if(!roles.include(req.user.role)){
            throw ApiError.forbidden("You do not have permission to perform this action.")
        }
        next();
    }
}

export { authenticate,authorize };
