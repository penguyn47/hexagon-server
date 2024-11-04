const express = require('express');
const route = express.Router();

const argon2 = require('argon2');

const User = require('../models/user.model.js');

route.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPass = await argon2.hash(password);

        const user = await User.create({
            username: username,
            password: hashedPass,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

route.get('/all', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

route.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }

        res.status(200).json({ message: "Successful!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = route