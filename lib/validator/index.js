"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var Validator = function (params, schema) {
    if (!params) {
        return {
            error: true,
            message: "Faltando parâmetros obrigatórios",
        };
    }
    var result = schema.validate(params);
    if (result.error) {
        return {
            error: true,
            message: "O seguinte par\u00E2metro est\u00E1 faltando ou incorreto: ".concat(result.error.details[0].path[0]),
            errorMessage: result.error.details[0].message,
        };
    }
    return {
        value: result.value,
        error: false,
    };
};
exports.Validator = Validator;
//# sourceMappingURL=index.js.map