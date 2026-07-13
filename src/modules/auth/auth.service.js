import User from "./auth.model.js";

const register = async ({ name, email, password, role }) => {
    // do user registration
    const user = await User.findOne({ email });
    if (user) throw ApiError.conflict("Email already exists");

    let userObj;
    return userObj;
};

export { register };
