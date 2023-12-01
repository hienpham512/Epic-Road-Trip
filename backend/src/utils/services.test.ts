import { preparedParams } from "./services";

describe("preparedParams", () => {
  it("should return an object with the correct values", () => {
    const params = {
      page: 1,
      limit: 10,
      sort: {
        prop: "name",
        order: "asc",
      },
    };
    const result = preparedParams(params);
    expect(result).toEqual({
      page: 1,
      limit: 10,
      sort: "name,asc",
    });
  });

  it("should return an object with the correct values", () => {
    const params = {
      page: 1,
      limit: 10,
      sort: {
        prop: "name",
        order: "asc",
      },
      filter: {
        name: "test",
      },
    };
    const result = preparedParams(params);
    expect(result).toEqual({
      page: 1,
      limit: 10,
      sort: "name,asc",
    });
  });

  it("should remove null element and return an object with the correct values", () => {
    const params = {
      page: 1,
      limit: 10,
      sort: {
        prop: "name",
        order: "asc",
      },
      filter: {
        name: null,
      },
    };
    const result = preparedParams(params);
    expect(result).toEqual({
      page: 1,
      limit: 10,
      sort: "name,asc",
    });
  });
});
