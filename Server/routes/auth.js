import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Model/UserModel.js';
import { check, validationResult } from 'express-validator'
import Authorization from '../middlewear/authorization.js';

const router = express.Router();


router.get('/auth', Authorization, async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "server error" })
    }
})



// for autheticate user for getting token
// login
router.post('/login', [

    check('email', "Please enter the valid email").isEmail(),
    check('password', "password is required").exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (!user) return res.status(201).json({ errors: [{ msg: 'Invalid Credentials' }] });


        const matached = await bcrypt.compare(password, user.password);
        if (!matached) return res.status(400).json({ msg: "Invalid Credentails" })


        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.KEY, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }

})





export default router;