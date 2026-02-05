'use server';

import { cookies } from 'next/headers';
import apiClient from '@/lib/api-client';
import { LoginDto, RegisterDto, AuthResponse, BaseResponse } from '@shared/index';

export async function login(data: LoginDto): Promise<BaseResponse<AuthResponse | null>> {
    try {
        const response = await apiClient.post<BaseResponse<AuthResponse>>('/auth/login', data);
        const { token, user } = response.data.data;

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return {
            status: 200,
            message: 'Login successful',
            data: { token, user }
        };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Login failed',
            data: null
        };
    }
}

export async function register(data: RegisterDto): Promise<BaseResponse<AuthResponse | null>> {
    try {
        const response = await apiClient.post<BaseResponse<AuthResponse>>('/auth/register', data);
        const { token, user } = response.data.data;

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return {
            status: 201,
            message: 'Registration successful',
            data: { token, user }
        };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Registration failed',
            data: null
        };
    }
}

export async function logout(): Promise<BaseResponse<null>> {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    return {
        status: 200,
        message: 'Logged out successfully',
        data: null
    };
}

export async function getSession(): Promise<BaseResponse<AuthResponse | null>> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { status: 401, message: 'No session', data: null };
    }

    try {
        const response = await apiClient.get<BaseResponse<AuthResponse>>('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return {
            status: error.response?.status || 401,
            message: 'Session invalid',
            data: null
        };
    }
}
