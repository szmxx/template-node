import Joi from "joi";

export const DemoSchema = Joi.object({
  name: Joi.string().required(),
});
