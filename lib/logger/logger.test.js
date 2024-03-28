"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe("StructureLogger", function () {
    beforeAll(function () {
        process.env.stage = "development";
    });
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it("should log with level error", function () {
        //Arrange
        var structureLogger = new index_1.StructureLogger();
        var spy = jest.spyOn(structureLogger, "log");
        var consoleSpy = jest.spyOn(console, "error");
        //Act
        structureLogger.log("functionTest", "ERROR", {
            message: "missing parameter",
            success: false,
            error: "missing parameter test",
        });
        expect(spy).toHaveBeenCalledWith("functionTest", "ERROR", {
            message: "missing parameter",
            success: false,
            error: "missing parameter test",
        });
        expect(consoleSpy).toHaveBeenCalled();
    });
    it("should log with level info", function () {
        //Arrange
        var structureLogger = new index_1.StructureLogger();
        var spy = jest.spyOn(structureLogger, "log");
        var consoleSpy = jest.spyOn(console, "log");
        //Act
        structureLogger.log("functionTest", "INFO", {
            message: "user updated",
        });
        expect(spy).toHaveBeenCalledWith("functionTest", "INFO", {
            message: "user updated",
        });
        expect(consoleSpy).toHaveBeenCalled();
    });
    it("should log with level warn", function () {
        //Arrange
        var structureLogger = new index_1.StructureLogger();
        var spy = jest.spyOn(structureLogger, "log");
        var consoleSpy = jest.spyOn(console, "warn");
        //Act
        structureLogger.log("functionTest", "WARN", {
            message: "user updated",
        });
        expect(spy).toHaveBeenCalledWith("functionTest", "WARN", {
            message: "user updated",
        });
        expect(consoleSpy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=logger.test.js.map