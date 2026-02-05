export interface User {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponse {
    user: Omit<User, 'password'>;
    token: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}
