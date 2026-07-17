import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";
const register = async (req, res) => {
    //Something
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
    const { user, acessToken, refreshToken } = await authService.login(
        req.body,
    );
    ApiResponse.ok("Login successful");
};

export { register, login };
