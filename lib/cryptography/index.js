"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
var aChaves = [77, 84, 79, 65, 73, 78, 67, 70, 82];
var transformarCaracteres = function (input, multiplicador) {
    var resultado = "";
    for (var i = 0; i < input.length; i++) {
        var n = input.charCodeAt(i);
        if (n > 31) {
            n = n - 32;
            n = n + (aChaves[i % aChaves.length] * multiplicador);
            n = n % 224;
            if (n < 0)
                n = 224 + n;
            n = n + 32;
        }
        resultado += String.fromCharCode(n);
    }
    return resultado;
};
var encrypt = function (strOriginal) {
    var transformado = transformarCaracteres(strOriginal, 1);
    var buffer = Buffer.from(transformado, 'utf-8');
    return buffer.toString('hex');
};
exports.encrypt = encrypt;
var decrypt = function (hexString) {
    var buffer = Buffer.from(hexString, 'hex');
    var input = buffer.toString('utf-8');
    return transformarCaracteres(input, -1);
};
exports.decrypt = decrypt;
//# sourceMappingURL=index.js.map