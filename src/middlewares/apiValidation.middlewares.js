import Joi from "joi"

export const validate = () => {
    try {
        console.log("hello")
        return (req, res, next) => {
            const schema = Joi.object({
                username: Joi.string().min(6).max(30).required(),
                password: Joi.string().min(8).max(30).pattern(/[a-zA-Z0-9]{3,30}/).required(),
                email: Joi.string().email().required()
            });

            const { error } = schema.validate(req.body);
            console.log(req.body)
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            next();
        };
    } catch (error) {
        console.log(error)
    }
};