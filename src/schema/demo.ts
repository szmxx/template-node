/*
 * @Author: cola
 * @Date: 2023-09-14 19:17:37
 * @LastEditors: cola
 * @Description:
 */
import Joi from "joi";

export const DemoSchema = Joi.object({
  name: Joi.string().required(),
});
