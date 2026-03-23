import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: "Server misconfiguration: JWT_SECRET is missing" });
    }

    const token = req.cookies.token

    if(!token) return res.status(401).json("Unauthorized");

    jwt.verify(token, jwtSecret, async (err, payload) => {
        
        if(err) return res.status(401).json("Unauthorized");

        req.userId = payload.userId;

        next();
    })
}