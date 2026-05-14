"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var AutoHandler_1 = __importDefault(require("./handler/AutoHandler"));
var setAWSLogLink_1 = __importDefault(require("./middleware/setAWSLogLink"));
/**
 * Inicializa o roteador automático de rotas Lambda.
 *
 * @param dir - Caminho(s) para a(s) pasta(s) contendo os controllers das rotas.
 *              Pode ser uma string ou um array de strings.
 * @param allowMethodsDiableCors - Lista de métodos (rotas) que terão o CORS desabilitado.
 *                                  Padrão: `[]`
 * @param publicMethods - Lista de métodos (rotas) que **não** exigem autenticação.
 *                        O nome deve corresponder exatamente ao nome do arquivo/pasta do controller.
 *                        Padrão: `[]`
 *
 * @example
 * Router(
 *   [dirUser, dirApi, dirGestores],
 *   [],               // allowMethodsDiableCors
 *   ["login", "webhook"] // rotas públicas, sem autenticação
 * );
 */
var handler = function (dir, allowMethodsDiableCors, publicMethods) {
    if (allowMethodsDiableCors === void 0) { allowMethodsDiableCors = []; }
    if (publicMethods === void 0) { publicMethods = []; }
    return (0, AutoHandler_1.default)(dir, allowMethodsDiableCors, publicMethods, setAWSLogLink_1.default);
};
exports.handler = handler;
//# sourceMappingURL=index.js.map