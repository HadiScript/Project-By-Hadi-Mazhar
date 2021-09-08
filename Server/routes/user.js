import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { check, validationResult } from 'express-validator';

import User from '../Model/UserModel.js';


const router = express.Router();


// for registeration user
router.post('/Register', [

    check('name', "Name is required").not().isEmpty(),
    check('email', "Please enter the valid email").isEmail(),
    check('password', "Please enter a password with 4 or more charactor").isLength({ min: 4 })

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (user) return res.status(201).json({ errors: [{ msg: 'User already exists' }] });

        const avatar = gravatar.url(email, {
            s: 200,
            r: 'pg',
            d: 'mm'
        })


        user = new User({ name, email, avatar, password });

        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hashSync(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.KEY, { expiresIn: 360000000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }

})




export default router;