let supertest = require('supertest');
let server = require('../index');

let request = supertest(server);

let mainUser = {
    name: "Andrey Wilmsen",
    email: "andreywilmsendepaula@gmail.com",
    password: "123456",
    confirmPassword: "123456"
};

describe("Conexão com servidor", function () {
    it("Deve se conectar a porta 8080", async () => {
        return request.get("/")
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            })
    })
});

describe("Registro de usuário", function () {

    it("Deve registrar um usuário", async () => {
        return request.post("/register").send(mainUser)
            .then(res => {
                expect(res.statusCode).toEqual(200);
            }).catch(err => {
                throw err;
            })
    });
    it("Deve impedir que um usuário cadastre dados vazios", async () => {
        let user = { name: "", email: "", password: "", confirmPassword: "" };

        return request.post("/register").send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Não é permitido inserir dados vazios")
            }).catch(err => {
                throw err;
            })
    });
    it("Deve impedir que cadastre um email já cadastrado", async () => {
        return request.post("/register").send(mainUser)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("Usuário já cadastrado");
            }).catch(err => {
                throw err;
            })
    })
    it("Deve impedir que insira o password e a confirmação diferentes", async () => {

        let user = {
            name: "Andrey Wilmsen",
            email: "usuariodeteste@gmail.com",
            password: "1234567",
            confirmPassword: "123456"
        }

        return request.post("/register").send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual("As senhas não são identicas");
            }).catch(err => {
                throw err;
            })
    })

});

describe("Deletar usuário", function () {
    it("Deve excluir usuário pelo email fornecido", async () => {
        return request.delete(`/user/${mainUser.email}`)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual("Usuário deletado com sucesso");
            }).catch(err => {
                throw err;
            })
    })
})

afterAll((done) => {
    server.close(done);
});