import jwt from "jsonwebtoken";


const Authorization = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "Authorization failed" });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "token is not valid" });
    }
};



export default Authorization;

