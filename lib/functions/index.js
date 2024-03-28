"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculaDigitoEAN = void 0;
var barcode_validator_1 = __importDefault(require("barcode-validator"));
var calculaDigitoEAN = function (EAN) {
    try {
        // Se foram passados apenas zeros ou o tamanho é menor que 8 ou maior que 14, retorna inválido
        if (parseInt(EAN) === 0 ||
            String(parseInt(EAN)).length < 8 ||
            String(parseInt(EAN)).length > 14 ||
            Number.isNaN(EAN.replace(".", "").replace(",", ""))) {
            // Retorna com um dígito "X" indicando que o EAN passado é inválido quanto ao tamanho padrão
            return false;
        }
        // Verifica se é uma balança
        if (EAN.startsWith("2") || EAN.startsWith("02")) {
            // Retorna com um dígito "X" indicando que o EAN passado é inválido para balanças
            return false;
        }
        // Parâmetros
        var Codigo = EAN.slice(0, -1); // Despreza o dígito passado
        var Tamanho = Codigo.length;
        // Consistência prévia do tamanho passado
        // UPC 12 = 11 dígitos + DV
        // EAN 8 = 7 dígitos + DV
        // EAN 13 = 12 digitos + DV
        // SCC-14/DUN/GTIN 14 = 13 dígitos + DV
        // Consiste com o tamanho "líquido" já desprezando o DV
        if (![7, 10, 11, 12, 13].includes(Tamanho)) {
            // Retorna com um dígito "X" indicando que o EAN passado é inválido quanto ao tamanho padrão
            return false;
        }
        return (0, barcode_validator_1.default)(EAN);
    }
    catch (error) {
        return false;
    }
};
exports.calculaDigitoEAN = calculaDigitoEAN;
//# sourceMappingURL=index.js.map