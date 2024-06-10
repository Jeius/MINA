
import { db } from '@/lib/utils';
import { NextResponse } from 'next/server';

const search = async (query: string) => {
    try {
        const facilities = await db.facility.findMany({
            select: { id: true, name: true },
            where: { name: { contains: query, mode: 'insensitive' } },
        })

        console.log(facilities);

        return facilities;
    } catch (error: any) {
        console.error(error.message);
    }
}

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const results = await search(query);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
    }
}