"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateOptions = exports.LEVEL_WARN = exports.LEVEL_PENDING = exports.LEVEL_INFO = exports.LEVEL_FAIL = exports.LEVEL_ERROR = exports.LEVEL_DEBUG = void 0;
var LEVEL_DEBUG = "debug";
exports.LEVEL_DEBUG = LEVEL_DEBUG;
var LEVEL_PENDING = "pending";
exports.LEVEL_PENDING = LEVEL_PENDING;
var LEVEL_INFO = "info";
exports.LEVEL_INFO = LEVEL_INFO;
var LEVEL_FAIL = "fail";
exports.LEVEL_FAIL = LEVEL_FAIL;
var LEVEL_ERROR = "error";
exports.LEVEL_ERROR = LEVEL_ERROR;
var LEVEL_WARN = "warn";
exports.LEVEL_WARN = LEVEL_WARN;
var dateOptions = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    era: "long",
    timeZoneName: "long",
};
exports.dateOptions = dateOptions;
//# sourceMappingURL=constants.js.map