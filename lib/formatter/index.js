"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.price = void 0;
var price = function (value) {
    return new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
    }).format(value);
};
exports.price = price;
//# sourceMappingURL=index.js.map