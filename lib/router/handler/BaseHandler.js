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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var logger = __importStar(require("../../logger"));
var BaseHandler = /** @class */ (function () {
    function BaseHandler() {
        this.event = null;
        this.context = null;
        this.env = process.env;
    }
    BaseHandler.prototype.handle = function (event, context, method) {
        return __awaiter(this, void 0, void 0, function () {
            var log, origin, newEvent, newEvent, logPayload_1, response, logPayload, returnFunction, err_1, logPayload, message;
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        this.setFunctionContext(event, context);
                        origin = ((_a = event.headers) === null || _a === void 0 ? void 0 : _a.origin) || ((_b = event.headers) === null || _b === void 0 ? void 0 : _b.Origin);
                        if ((_c = JSON.stringify(event === null || event === void 0 ? void 0 : event.headers)) === null || _c === void 0 ? void 0 : _c.toUpperCase().includes("DB_NAME")) {
                            global.DB_NAME = (_d = event.headers.DB_NAME) !== null && _d !== void 0 ? _d : event.headers.db_name;
                        }
                        if ((_e = JSON.stringify(event === null || event === void 0 ? void 0 : event.headers)) === null || _e === void 0 ? void 0 : _e.includes("form-data")) {
                            event.body = JSON.stringify({
                                formData: event.body,
                            });
                            newEvent = __assign({}, event);
                            newEvent.body = JSON.stringify({
                                formData: "***FORMDATA***",
                            });
                            log = logger.initLog({ event: newEvent, context: context }, "pending");
                        }
                        else if ((_f = JSON.stringify(event === null || event === void 0 ? void 0 : event.body)) === null || _f === void 0 ? void 0 : _f.includes("base64")) {
                            newEvent = JSON.parse(event.body);
                            newEvent.base64 = "***BASE64***";
                            newEvent = JSON.stringify(newEvent);
                            log = logger.initLog({ event: newEvent, context: context }, "pending");
                        }
                        else {
                            log = logger.initLog({ event: event, context: context }, "pending");
                        }
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 6, , 7]);
                        if (!this.isAuthorized()) {
                            logPayload_1 = log();
                            logPayload_1.response = {
                                statusCode: 401,
                                message: "Unauthorized!",
                            };
                            logger.initLog(logPayload_1, "warn");
                            return [2 /*return*/, BaseHandler.httpResponse({
                                    statusCode: 401,
                                    body: JSON.stringify(logPayload_1.response),
                                })];
                        }
                        context.callbackWaitsForEmptyEventLoop = false;
                        response = void 0;
                        if (!(typeof this[method] == "object")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this[method]["default"](event, context)];
                    case 2:
                        response = _h.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this[method](event, context)];
                    case 4:
                        response = _h.sent();
                        _h.label = 5;
                    case 5:
                        if (response === null || response === void 0 ? void 0 : response.status) {
                            response.statusCode = response === null || response === void 0 ? void 0 : response.status;
                        }
                        logPayload = log();
                        logPayload.response = __assign({}, response);
                        if (response.statusCode >= 200 && response.statusCode <= 299) {
                            logger.initLog(logPayload, "info");
                        }
                        else {
                            logger.initLog(logPayload, "error");
                        }
                        returnFunction = BaseHandler.httpResponse({
                            statusCode: response.statusCode,
                            body: typeof response === "string" ? response : JSON.stringify(response),
                            headers: response.headers,
                        });
                        return [2 /*return*/, returnFunction];
                    case 6:
                        err_1 = _h.sent();
                        logPayload = log();
                        message = (err_1 === null || err_1 === void 0 ? void 0 : err_1.response) && ((_g = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _g === void 0 ? void 0 : _g.data)
                            ? err_1.response.data
                            : (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || err_1;
                        logger.initLog(logPayload, "error");
                        return [2 /*return*/, BaseHandler.httpResponse({
                                statusCode: 500,
                                body: message,
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaseHandler.prototype.setFunctionContext = function (event, context) {
        this.event = event;
        this.context = context;
        process.env.sourceIpAddress =
            event.requestContext &&
                event.requestContext.identity &&
                event.requestContext.identity.sourceIp
                ? event.requestContext.identity.sourceIp
                : null;
    };
    BaseHandler.httpResponse = function (data) {
        var _a;
        return {
            statusCode: data.statusCode,
            body: data.body,
            headers: __assign({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, cnpj, type, cnpj_gestor" }, ((_a = data.headers) !== null && _a !== void 0 ? _a : {})),
        };
    };
    BaseHandler.prototype.isAuthorized = function () {
        var _a;
        var checkByAuthMethod = {
            header: this.authHeaderIsTheSameInTheEnvironment(),
        }[(_a = this.env.authMethod) !== null && _a !== void 0 ? _a : "header"];
        if (checkByAuthMethod === undefined) {
            return true;
        }
        return checkByAuthMethod;
    };
    BaseHandler.prototype.authHeaderIsTheSameInTheEnvironment = function () {
        if (this.event.headers === undefined || this.env.noAuth) {
            return true;
        }
        return (this.event.headers.Authorization === this.env.authToken ||
            this.event.headers.authorization === this.env.authToken);
    };
    return BaseHandler;
}());
exports.default = BaseHandler;
//# sourceMappingURL=BaseHandler.js.map