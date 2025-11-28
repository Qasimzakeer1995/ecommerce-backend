const { validationResult } = require('express-validator');
const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { user, token } = await authService.registerUser(req.body);
        res.send({ user, auth: token });

    } catch (error) {
        res.status(500).send({ result: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const data = await authService.loginUser(email, password);
    if (!data) return res.status(404).send({ result: "No user found" });

    res.send({ user: data.user, auth: data.token });
};
