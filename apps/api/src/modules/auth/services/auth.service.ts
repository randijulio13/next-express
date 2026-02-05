import { AppDataSource } from "../../../config/data-source";
import { UserEntity } from "../../../entities/user.entity";
import { LoginDto, RegisterDto, AuthResponse } from "@shared/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(UserEntity);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthService {
    async register(data: RegisterDto): Promise<AuthResponse> {
        const existingUser = await userRepository.findOneBy({ email: data.email });
        if (existingUser) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = userRepository.create({
            ...data,
            password: hashedPassword,
        });

        await userRepository.save(user);

        const token = this.generateToken(user.id);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    async login(data: LoginDto): Promise<AuthResponse> {
        const user = await userRepository.findOne({
            where: { email: data.email },
            select: ["id", "email", "name", "password", "createdAt", "updatedAt"],
        });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = this.generateToken(user.id);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token,
        };
    }

    private generateToken(userId: number): string {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
    }
}
