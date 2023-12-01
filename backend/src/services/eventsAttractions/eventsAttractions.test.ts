import { getAttractions, getEvents } from "./eventsAttractions";

import config from "../../../config";

describe('attractions', () => {
    it('get attractions with position', async () => {

        const body = {
            "location": {
                "lat": 48.8566,
                "lng": 2.3522
            },
            radius: config.options.radius
        }
        const params = {};

        const paramsService = Object.assign(params, body);

        const result = await getAttractions(paramsService)
        expect(result).toHaveProperty("html_attributions");
        expect(result).toHaveProperty("next_page_token");
        expect(result).toHaveProperty("results");
    });
});
