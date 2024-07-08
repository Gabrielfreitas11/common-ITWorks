"use strict";
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
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=index.js.map