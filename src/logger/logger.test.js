const { StructureLogger } = require("./index");

describe("StructureLogger", () => {
  beforeAll(() => {
    process.env.stage = "development";
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should log with level error", () => {
    //Arrange
    const structureLogger = new StructureLogger();

    const spy = jest.spyOn(structureLogger, "log");
    const consoleSpy = jest.spyOn(console, "error");

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

  it("should log with level info", () => {
    //Arrange
    const structureLogger = new StructureLogger();

    const spy = jest.spyOn(structureLogger, "log");
    const consoleSpy = jest.spyOn(console, "log");

    //Act
    structureLogger.log("functionTest", "INFO", {
      message: "user updated",
    });

    expect(spy).toHaveBeenCalledWith("functionTest", "INFO", {
      message: "user updated",
    });

    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should log with level warn", () => {
    //Arrange
    const structureLogger = new StructureLogger();

    const spy = jest.spyOn(structureLogger, "log");
    const consoleSpy = jest.spyOn(console, "warn");

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
