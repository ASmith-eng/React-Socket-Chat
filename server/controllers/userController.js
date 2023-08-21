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

        let user = await User.create({
            email: email,
            username: username,
            password: encryptedPassword
        });
        user = await user.toObject();
        delete user.password;

        return res.json({ status: true, user });
    }
    catch (err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
        user = await user.toObject();
        if(!user) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.json({ msg: "incorrect username or password", status: false });
        }
        
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (err) {
        next(err);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.json(users);
    }
    catch (err) {
        next(err);
    }
}