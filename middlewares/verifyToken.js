const Jwt = require('jsonwebtoken');
const jwtKey = "learning";

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];

    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, jwtKey, (err) => {
            if (err) return res.status(401).send({ result: "Please provide valid token" });
            next();
        });
    } else {
        res.status(403).send({ result: "Please add token" });
    }
};
