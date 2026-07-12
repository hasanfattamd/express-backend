import ApiError from "../utils/api-error.js";

const validate = (Dtoclass) => {
    return (req, res, next) => {
        const { errors, value } = Dtoclass.validate(req.body);
        if (errors) {
            throw ApiError.badRequest(errors.join("; "));
        }
        req.body = value; // sanitized | validated data
        next();
    };
};

export default validate;
