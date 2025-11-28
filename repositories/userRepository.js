const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.createUser = async (data) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const newUser = new User({
        ...data,
        password: hashedPassword
    });

    return await newUser.save();
};

exports.findByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user; // password matched
};

exports.findByEmail = async (email) => {
    return await User.findOne({ email });
};
