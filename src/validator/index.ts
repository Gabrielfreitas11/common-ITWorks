import * as Joi from "Joi";
import { messages } from "joi-translation-pt-br";

export const Validator = (params: any, schema: Joi.ObjectSchema) => {
  if (!params) {
    return {
      error: true,
      message: "Faltando parâmetros obrigatórios",
    };
  }

  const result = schema.validate(params, { messages });
  if (result.error) {
    return {
      error: true,
      message: result.error.message,
    };
  }

  return {
    value: result.value,
    error: false,
  };
};
