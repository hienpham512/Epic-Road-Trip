import { getAccomodations } from './accomodations';
import config from "../../../config";

describe('test', () => {
    it('test with only position', async () => {

        const body = {
            "location": {
                "lat": 48.8566,
                "lng": 2.3522
            },
            radius: config.options.radius
        }
        const params = {};

        const paramsService = Object.assign(params, body);

        const result = await getAccomodations(paramsService)
        expect(result).toHaveProperty("html_attributions");
        expect(result).toHaveProperty("next_page_token");
        expect(result).toHaveProperty("results");
    });

    it('test catch error', async () => {

        const body = {
            "location": {
                "lat": "PUTEUX",
                "lng": 2.3522
            },
            radius: config.options.radius
        }
        const params = {};

        const paramsService = Object.assign(params, body);

        const result = await getAccomodations(paramsService).catch(e => {
            expect(e).toHaveProperty("statusCode");
        });
    });
});