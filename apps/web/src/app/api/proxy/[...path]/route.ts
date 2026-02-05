import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/lib/api-client';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const path = (await params).path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `/${path}${searchParams ? `?${searchParams}` : ''}`;

    try {
        const response = await apiClient.get(url, {
            responseType: 'arraybuffer', // Handle files etc.
            headers: {
                Authorization: request.headers.get('Authorization') || '',
            },
        });

        const contentType = response.headers['content-type'];
        return new NextResponse(response.data, {
            headers: {
                'Content-Type': contentType,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Proxy request failed' },
            { status: error.response?.status || 500 }
        );
    }
}

// Similarly for POST if needed, but the rule says use server actions for actions
