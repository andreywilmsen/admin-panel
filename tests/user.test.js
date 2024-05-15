let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

describe("Conexão com servidor", function () {
    it("Deve se conectar a porta 8080", async () => {
        return request.get("/")
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            })
    })
    afterAll((done) => {
        server.close(done);
    });
});