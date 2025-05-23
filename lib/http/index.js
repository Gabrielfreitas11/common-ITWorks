"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var axios_1 = __importDefault(require("axios"));
var logger = __importStar(require("../logger"));
var logAdapter = function (_a) {
    var _b;
    var _c = _a.statusCode, statusCode = _c === void 0 ? 0 : _c, _d = _a.response, response = _d === void 0 ? { data: "" } : _d, options = _a.options;
    if ((_b = JSON.stringify(options === null || options === void 0 ? void 0 : options.headers)) === null || _b === void 0 ? void 0 : _b.includes("form-data")) {
        options.data = {
            formData: "***FORMDATA***",
        };
    }
    var logType = statusCode < 200 || statusCode > 299 ? "fail" : "info";
    logger[logType]({
        request: options,
        response: {
            statusCode: statusCode,
            body: options.responseType === "stream"
                ? "**STREAM**"
                : response.data instanceof Buffer
                    ? { type: "Buffer", data: "**ARRAYBUFFER**" }
                    : JSON.stringify(response.data).length > 10000
                        ? {
                            type: "Base64 ou JSON muito grande",
                            data: "**Retorno muito grande**",
                        }
                        : response.data, // eslint-disable-line
        },
    });
};
var handler = function (options_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([options_1], args_1, true), void 0, function (options, logData, optionsHttpsAgent) {
        var log, newOptions, newOptions, optionsAxios;
        var _a;
        if (logData === void 0) { logData = true; }
        if (optionsHttpsAgent === void 0) { optionsHttpsAgent = null; }
        return __generator(this, function (_b) {
            if ((_a = JSON.stringify(options === null || options === void 0 ? void 0 : options.headers)) === null || _a === void 0 ? void 0 : _a.includes("form-data")) {
                newOptions = __assign({}, options);
                newOptions.data = {
                    formData: "***FORMDATA***",
                };
                log = logger.initLog({ request: newOptions }, "pending", logData);
            }
            else {
                newOptions = __assign({}, options);
                if (!logData) {
                    newOptions = {
                        data: "***LOG DESABILITADO***",
                    };
                }
                log = logger.initLog({ request: newOptions }, "pending", logData);
            }
            optionsAxios = optionsHttpsAgent && (optionsHttpsAgent === null || optionsHttpsAgent === void 0 ? void 0 : optionsHttpsAgent.httpsAgent)
                ? optionsHttpsAgent
                : options;
            return [2 /*return*/, (0, axios_1.default)(optionsAxios).then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        logAdapter({
                            statusCode: response.status,
                            response: response,
                            options: options,
                        });
                        return [2 /*return*/, response];
                    });
                }); }, function (error) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        logAdapter({ error: error, options: options, statusCode: 500 });
                        throw error;
                    });
                }); })];
        });
    });
};
exports.handler = handler;
//# sourceMappingURL=index.js.map