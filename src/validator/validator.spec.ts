import * as Joi from "Joi";
import { Validator } from "./index";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().uuid().required(),
});

describe("Validator", () => {
  it("should return  error equals true and a message when there is no parameter", () => {
    //Arrange

    //Act
    const result = Validator(undefined, userSchema);

    //Assert
    expect(result.error).toBe(true);
    expect(result.message).toBe("Faltando parâmetros obrigatórios");
  });

  it.each([
    {
      params: {
        username: "",
      },
      message: '"username" não deve ser vazio',
    },
    {
      params: {
        username: "u",
      },
      message:
        'A quantidade de caracteres de "username" deve ser de pelo menos 3',
    },
    {
      params: {
        username: "usernameusernameusernameusernameusernameusernameusername",
      },
      message:
        'A quantidade de caracteres de "username" deve ser menor ou igual que 30',
    },
    {
      params: {
        username: "username",
        email: "",
      },
      message: '"email" não deve ser vazio',
    },

    {
      params: {
        username: "username",
        email: "email",
      },
      message: '"email" deve ser um e-mail válido',
    },

    {
      params: {
        username: "username",
        email: "email@eaxample.com",
        password: "",
      },
      message: '"password" não deve ser vazio',
    },

    {
      params: {
        username: "username",
        email: "email@eaxample.com",
        password: "a",
      },
      message: '"password" deve ser um GUID válido',
    },
  ])(
    "should validate the joi schema and return the messages in portuguese $message",
    ({ params, message }) => {
      //Arrange

      //Act
      const result = Validator(params, userSchema);

      //Assert
      expect(result.error).toEqual(true);
      expect(result.message).toEqual(message);
    }
  );
});
