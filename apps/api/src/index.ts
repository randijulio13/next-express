import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./modules/auth/auth.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    // app running information
    res.json({
        name: "Next Express API",
        version: "1.0.0",
        status: "running",
        timestamp: new Date().toISOString(),
    });
});

// Database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
