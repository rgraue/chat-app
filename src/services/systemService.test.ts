// systemService.test.ts
import { SystemService } from "./systemService";

describe("SystemService", () => {
  let service: SystemService;

  beforeEach(() => {
    service = new SystemService({ model: "default-model" });
  });

  describe("getState()", () => {
    it("should return the stored state", () => {
      expect(service.getState().model).toBe("default-model");
    });
  });

  describe("setStateValue()", () => {
    it("should update the model property", () => {
      service.setStateValue("model", "new-model");

      expect(service.getState().model).toBe("new-model");
    });

    it("should handle other properties", () => {
      const initialModel = "initial";

      service.setStateValue("otherProperty", 123);
      service.setStateValue("model", initialModel);

      expect(service.getState()).toEqual({
        model: initialModel,

        otherProperty: 123,
      });
    });
  });

  describe("getStateValue()", () => {
    it("should retrieve the correct property value", () => {
      const initialValue = "initial";

      service.setStateValue("model", initialValue);

      expect(service.getStateValue("model")).toBe(initialValue);

      // Test with different initial values

      service.setStateValue("otherProperty", 123);

      expect(service.getStateValue("otherProperty")).toBe(123);
    });
  });

  describe("Initialization", () => {
    it("should initialize with the provided state object", () => {
      const initialState = { model: "initial-model" };

      const service = new SystemService(initialState);

      expect(service.getState()).toEqual(initialState);
    });
  });
});
