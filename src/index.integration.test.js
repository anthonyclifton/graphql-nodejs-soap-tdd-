const Enzyme = require('enzyme');
const axios = require('axios');

describe("graphql", () => {
    let httpClient;
    let response;

    beforeEach(() => {
        httpClient = axios.create({baseURL: 'http://localhost:4000'});
    });

    describe("endpoint", () => {
        test("should return list of books when given well-formed query", async () => {
            const expectedResult = {
                "data":
                    {
                        "books": [
                            {"title":"Something something something",
                                "author":"Someone someone"
                            },
                            {"title":"Something else",
                                "author":"Someone else"
                            }
                            ]
                    }
            };

            const request =
                { query: `{
                        books {
                            title
                            author
                        }
                    }`
                };

            response = await httpClient.post('/', request);
            expect(response.status).toEqual(200);
            expect(response.data).not.toBeUndefined();
            expect(response.data).toEqual(expectedResult);
        });
    });
});