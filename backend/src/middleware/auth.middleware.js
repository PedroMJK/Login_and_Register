import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token not provided"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({
            message: "Token error",
        });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).json({
            message: "Token malformatted",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Token invalid",
        })
    }
}

export default authMiddleware;