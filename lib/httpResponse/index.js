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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
var HttpResponse = /** @class */ (function () {
    function HttpResponse() {
    }
    HttpResponse.ok = function (body, status) {
        var _a;
        if (status === void 0) { status = "statusCode"; }
        return _a = {},
            _a[status] = 200,
            _a.body = body,
            _a;
    };
    HttpResponse.custom = function (body, status) {
        var _a;
        if (status === void 0) { status = "statusCode"; }
        return _a = {},
            _a[status] = 200,
            _a.body = body,
            _a.custom = true,
            _a;
    };
    HttpResponse.created = function (body, status) {
        var _a;
        if (status === void 0) { status = "statusCode"; }
        return _a = {},
            _a[status] = 201,
            _a.body = body,
            _a;
    };
    HttpResponse.notFound = function (body, status) {
        var _a;
        if (status === void 0) { status = "statusCode"; }
        return _a = {},
            _a[status] = 404,
            _a.body = body,
            _a;
    };
    HttpResponse.badRequest = function (body, status) {
        var _a;
        if (status === void 0) { status = "statusCode"; }
        return _a = {},
            _a[status] = 400,
            _a.body = body,
            _a;
    };
    HttpResponse.serverError = function (body, status) {
        var _a;
        if (status === void 0) { status = "statusCode"; }
        return _a = {},
            _a[status] = 500,
            _a.body = body,
            _a;
    };
    /**
     * Marca uma resposta para NÃO receber o campo `awsFilter` (link do CloudWatch).
     * Composável com qualquer um dos demais métodos.
     *
     * @example
     * return HttpResponse.noAwsFilter(HttpResponse.ok(body));
     * return HttpResponse.noAwsFilter(HttpResponse.custom(body));
     */
    HttpResponse.noAwsFilter = function (response) {
        return __assign(__assign({}, response), { disableAwsFilter: true });
    };
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=index.js.map