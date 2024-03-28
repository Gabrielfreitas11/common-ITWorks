"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var AutoHandler_1 = __importDefault(require("./handler/AutoHandler"));
var setAWSLogLink_1 = __importDefault(require("./middleware/setAWSLogLink"));
var handler = function (dir, allowMethodsDiableCors) {
    if (allowMethodsDiableCors === void 0) { allowMethodsDiableCors = []; }
    return (0, AutoHandler_1.default)(dir, allowMethodsDiableCors, setAWSLogLink_1.default);
};
exports.handler = handler;
//# sourceMappingURL=index.js.map