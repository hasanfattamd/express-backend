import ApiError from "../../common/utils/api-error.js";
import {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
    verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const hashToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
    // do user registration
    const userExist = await User.findOne({ email });
    if (userExist) throw ApiError.conflict("Email already exists");
    const { rawToken, hashedToken } = generateResetToken(); // We will send the rawToken to user in email.
    const user = await User.create({
        name,
        email,
        password,
        role,
        // verificationToken: hashedToken,
    });

    // TODO: send an email to user with token: rawToken
    const useObj = user.toObject();
    delete userObj.password; // We do not send password, verification token so if whatever the fields we do not want to send this is the way to achieve it.
    delete userObj.verificationToken;

    return userObj;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError.unauthorized("Invalid email or password");
    // somehow I will check the password

    if (!existingUser.isVerified)
        throw ApiError.forbidden("Please verify your email before login");

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

const refresh = (token) => {
    if (!token) throw new ApiError.unauthorized("Refresh Token missing");
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id).select('+refreshToken');
    if(!user) throw ApiError.unauthorized("User not found")
    
    if(user.refresToken !== hashToken(token)){
        throw new ApiError.unauthorized("Invalid Refresh Token")
    }

    const accessToken = generateAccessToken({id:user._id,role:user.role})
    const refreshToken = generateRefreshToken({id:user._id})   
    
    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return {accessToken, refreshToken}
};

const logout = (userId) => {

    await User.findByIdAndUpdate(userId,{refresToken:null})
}

const forgotPassword = (email) => {
    const user = await User.findOne({email}).select('+password');
    if(!user) throw ApiError.message("No account found with this email")
    const {rawToken, hashedToken} = generateResetToken();
    user.resetPasswordToken=hashedToken;
    user.resetPasswordExpires=Date.now() + 15 * 60 * 1000;
    await user.save()

}

export { register };
