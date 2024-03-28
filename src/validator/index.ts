import * as Joi from "Joi";

export const Validator = (params: any, schema: Joi.ObjectSchema) => {
  if (!params) {
    return {
      error: true,
      message: "Faltando parâmetros obrigatórios",
    };
  }

  const result = schema.validate(params);
  if (result.error) {
    return {
      error: true,
      message: `O seguinte parâmetro está faltando ou incorreto: ${result.error.details[0].path[0]}`,
      errorMessage: result.error.details[0].message,
    };
  }

  return {
    value: result.value,
    error: false,
  };
};
