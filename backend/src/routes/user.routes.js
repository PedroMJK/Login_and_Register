import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router()

router.get("/profile", authMiddleware, (req, res) => {
    return res.json({
        message: "Access granted",
        userId: req.userId,
    })
})

export default router;