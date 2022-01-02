const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");


const validateId = (req, res, next)=> {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Wrong id" });
    }

    next();
  }

const validateUpdateUseradmin = (req, res, next) => {
    const validationRules = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        // subscription: Joi.string().valid("free", "pro", "premium"),
      }).min(1);
  
      const validationResult = validationRules.validate(req.body);
      if (validationResult.error) {
        return res.status(400).send(validationResult.error);
      }
  
      next();
};

module.exports = {
    validateId,
    validateUpdateUseradmin
}