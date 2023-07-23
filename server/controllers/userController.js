const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if(usernameCheck) {
            return res.json({ msg: "This username is already taken", status: false });
        }

        const emailCheck = await User.findOne({ email });
        if(emailCheck) {
            return res.json({ msg: "This email is already registered", status: false });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            username: username,
            password: encryptedPassword
        });
        delete user.password;

        return res.json({ status: true, user });
    }
    catch (err) {
        next(err);
    }
}