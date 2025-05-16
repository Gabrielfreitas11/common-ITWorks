"use strict";
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var BaseHandler_1 = __importDefault(require("./BaseHandler"));
/**
 * @param {string} controllersPath path to the folder containing the routes
 * @param  {...Function<Promise>} middlewares any number of middlewares that alter the request response
 */
var AutoHandler = function (controllersPath, allowMethodsDiableCors) {
    var middlewares = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        middlewares[_i - 2] = arguments[_i];
    }
    var MyHandler = /** @class */ (function (_super) {
        __extends(MyHandler, _super);
        function MyHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MyHandler;
    }(BaseHandler_1.default));
    var handler = new MyHandler();
    var paths = Array.isArray(controllersPath)
        ? controllersPath
        : [controllersPath];
    var functionsToExport = {};
    paths.forEach(function (controllerPath) {
        var folders = fs.readdirSync(controllerPath);
        folders.filter(function (el) { return !el.startsWith("."); }).forEach(function (service) {
            handler[service] = require("".concat(controllerPath, "/").concat(service));
            functionsToExport[service] = function (event, context) {
                var requestPromise = handler.handle(event, context, service);
                // add middlewares if needed
                if (middlewares.length === 0) {
                    return requestPromise;
                }
                var lastPromise = middlewares.reduce(function (promise, middleware) {
                    return middleware(promise, service, event, context, BaseHandler_1.default);
                }, requestPromise);
                return lastPromise;
            };
        });
    });
    return functionsToExport;
};
exports.default = AutoHandler;
//# sourceMappingURL=AutoHandler.js.map