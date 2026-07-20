import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";
const register = async (req, res) => {
    //Something
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(
        req.body,
    );
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    };
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, //15 mins
    });
    ApiResponse.ok(res, "Login successful", {
        user: { id: user._id, email: user.email },
    });
};

const logout = async (req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "logout success");
};

const getMe = async (req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User Profile", {
        id: user_id,
        email,
    });
};
export { register, login, logout, getMe };
