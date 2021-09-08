import cor from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Connection from './Server/database/DB.js';

Connection;
dotenv.config();

import User from './Server/routes/user.js';
import Post from './Server/routes/post.js';
import Auth from './Server/routes/auth.js';
import Profile from './Server/routes/profile.js';


const app = express();
const port = process.env.PORT || 9000;

app.use(cor());
app.use(express.json());


app.use('/api', User);
app.use('/api', Auth);
app.use('/api/post', Post);
app.use('/api', Profile);


app.listen(port, () => console.log(`server started on port ${port}`))
