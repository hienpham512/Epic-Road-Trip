import { IDirectionsParams } from "@hienpham512/roadtrip";
import { getDirections } from "./directions";

describe("directions", () => {
  it("get directions with position", async () => {
    const body = {
      origin: {
        lat: 48.8595574,
        lng: 2.3472137,
      },
      destination: {
        lat: 48.8029812,
        lng: 2.3712608,
      },
    };
    const defaultParams = {
      mode: "transit",
      transit_mode: "train|bus|subway",
    };

    const paramsService: IDirectionsParams = Object.assign(body, defaultParams);
    const result: any = await getDirections(paramsService);
    expect(result).toHaveProperty("geocoded_waypoints");
    expect(result).toHaveProperty("routes");
    expect(result).toHaveProperty("status");
    expect(result?.status).toBe("OK");
  });
});
