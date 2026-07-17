import BaseDto from "../../../common/dto/base.dto";
import Joi from "joi";

class LoginDto extends BaseDto {
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .message("Password must contain 8 chars minimum")
            .min(8)
            .required(),
    });
}

export default LoginDto;
