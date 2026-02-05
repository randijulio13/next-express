import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { BaseResponse } from "@shared/index";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const result = await authService.register(req.body);
            const response: BaseResponse = {
                status: 201,
                message: "User registered successfully",
                data: result
            };
            return res.status(201).json(response);
        } catch (error: any) {
            const response: BaseResponse = {
                status: 400,
                message: error.message,
                data: null
            };
            return res.status(400).json(response);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);
            const response: BaseResponse = {
                status: 200,
                message: "Login successful",
                data: result
            };
            return res.status(200).json(response);
        } catch (error: any) {
            const response: BaseResponse = {
                status: 401,
                message: error.message,
                data: null
            };
            return res.status(401).json(response);
        }
    }

    async me(req: Request, res: Response) {
        const response: BaseResponse = {
            status: 200,
            message: "User profile fetched",
            data: { user: (req as any).user }
        };
        return res.status(200).json(response);
    }
}
