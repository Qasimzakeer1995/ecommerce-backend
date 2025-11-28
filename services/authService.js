const Jwt = require('jsonwebtoken');
const jwtKey = 'learning';
const userRepo = require('../repositories/userRepository');

exports.registerUser = async (data) => {
    // save user
    let user = await userRepo.createUser(data);
    user = user.toObject();
    delete user.password;

    // generate token
    const token = Jwt.sign({ user }, jwtKey, { expiresIn: "30m" });

    return { user, token };
};

exports.loginUser = async (email, password) => {
    let user = await userRepo.findByEmailAndPassword(email, password);

    if (!user) return null;

    // remove password
    user = user.toObject();
    delete user.password;

    const token = Jwt.sign({ user }, jwtKey, { expiresIn: "30m" });

    return { user, token };
};
