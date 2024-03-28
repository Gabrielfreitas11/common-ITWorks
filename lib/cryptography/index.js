"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
var data_1 = require("./data");
var criptoRule = function (strCripto, cypher) {
    if (cypher === void 0) { cypher = true; }
    var valorFinal = "";
    var aChaves = [77, 84, 79, 65, 73, 78, 67, 70, 82];
    var arrayCaracteres = strCripto.split("");
    arrayCaracteres.forEach(function (el, i) {
        var n = data_1.reverseCodes[el];
        if (n > 31) {
            n = n - 32;
            var valor = cypher ? 1 : -1;
            n = n + aChaves[i % 9] * valor;
            n = n % 224;
            if (n < 0) {
                n = 224 + n;
            }
            n = n + 32;
        }
        valorFinal = valorFinal + data_1.codes[n];
    });
    return valorFinal;
};
var encrypt = function (strCripto) { return criptoRule(strCripto); };
exports.encrypt = encrypt;
var decrypt = function (strCripto) { return criptoRule(strCripto, false); };
exports.decrypt = decrypt;
//# sourceMappingURL=index.js.map