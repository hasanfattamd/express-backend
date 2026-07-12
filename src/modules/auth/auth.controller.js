import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";
const register = async (req, res) => {
    //Something
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
};

export { register };

