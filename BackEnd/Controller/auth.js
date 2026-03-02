const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../model/User');
const saltRounds = 10;

exports.createUser = async (req, res) => {

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        const doc = await user.save();
        res.status(200).json({ id: doc.id, role: doc.role });
    } catch (err) { 
        res.status(400).json(err)
    }
}

exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
        return res.status(400).json('Invalid email or password.');

    const token = jwt.sign({ userId: user.id }, 'yourjwtsecret');
    const id = user.id;
    const role = user.role;
    res.send({ id, role, token })
}

exports.checkAuth = async (req, res) => {
    if (req.body) {
        res.json(req.body);
    } else {
        res.sendStatus(401);
    }
};

exports.signOut = async (req, res) => {
    res.json(null)
}

exports.resetPasswordRequest = async (req, res) => {
    const { email } = req.body.email;
    const user = await User.findOne({ email: email });
    console.log(user);

    // if (user) { 
    //     const token = jwt.sign({ userId: user.id }, 'yourjwtsecret');
    //     user.resetPasswordToken = token;
    //     await user.save();

    //     const resetPageLink = 'http://localhost:3000/reset-password?token=' + token + '&email=' + email;
    //     const subject = 'reset password for e-commerce';
    //     const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;

    //     if (email) {
    //         const response = await sendEmail({ to: email, subject, html });
    //         res.json(response)
    //     } else {
    //         res.sendStatus(400);
    //     }
    // } else {
    //     res.sendStatus(400);
    // }
}

exports.resetPassword = async (req, res) => {
    const { email, password, token } = req.body;

}