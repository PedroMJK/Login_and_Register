import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express()

// Middleware to JSON
app.use(express.json())

app.use(cors())

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

export default app;

