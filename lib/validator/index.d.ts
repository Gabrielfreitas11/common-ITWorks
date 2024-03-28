import * as Joi from "Joi";
export declare const Validator: (params: any, schema: Joi.ObjectSchema) => {
    error: boolean;
    message: string;
    errorMessage?: undefined;
    value?: undefined;
} | {
    error: boolean;
    message: string;
    errorMessage: string;
    value?: undefined;
} | {
    value: any;
    error: boolean;
    message?: undefined;
    errorMessage?: undefined;
};
