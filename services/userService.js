const User = require('../model/User');

const userService = {
    testService: async (req, res) => {
        let response = "Hello from GET";
        return { response };
    },
    registerService: async (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        let userFinded = await User.findOne({ email });

        // Impede que insira um usuário que já está cadastrado
        if (userFinded) return { success: false, userFinded: true };

        // Impede que insira um usuário com dados vazios
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            return { success: false, verifyEmptyFields: false };
        }

        // Impede que insira um usuário que inseriu a confirmação de senha diferente da senha
        if (confirmPassword != password) return { success: false, confirmPassword: false };

        // Caso esteja tudo correto, cria o usuário
        let response = await User.create({ name, email, password });

        return { user: response, success: true };

    },
    deleteService: async (req, res) => {
        let email = req.params.email;

        let response = await User.deleteOne({ email });

        if (response) return { user: response, success: true };

    }
}


module.exports = userService;