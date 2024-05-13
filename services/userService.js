
const userService = {
    get: async (req, res) => {
        let response = "Hello from GET";
        return { response };
    },
}


module.exports = userService;