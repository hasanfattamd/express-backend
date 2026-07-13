import { generateResetToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const register = async ({ name, email, password, role }) => {
    // do user registration
    const userExist = await User.findOne({ email });
    if (userExist) throw ApiError.conflict("Email already exists");
    const { rawToken, hashedToken } = generateResetToken();
    const user = await User.create({
        name,
        email,
        password,
        role,
        // verificationToken: hashedToken,
    });

    // TODO: send an email to user with token: rawToken
    const useObj = user.toObject();
    delete userObj.password;
    return userObj.verificationToken;

    return userObj;
};

export { register };
