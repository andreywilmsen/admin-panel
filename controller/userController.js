const userService = require('../services/userService');

const userController = {
    get: async (req, res) => {
        try {
            let response = await userService.get(req, res);
            if (response) return res.status(200).send(response.response);
        } catch (err) {
            res.status(500).send("Ocorreu um erro na rota GET");
        }
    },
}


module.exports = userController;