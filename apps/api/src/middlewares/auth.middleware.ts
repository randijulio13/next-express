import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { UserEntity } from "../entities/user.entity";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const userRepository = AppDataSource.getRepository(UserEntity);

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const user = await userRepository.findOneBy({ id: decoded.userId });

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
