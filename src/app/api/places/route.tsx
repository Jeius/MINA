
import { db } from '@/lib/utils';
import { NextResponse } from 'next/server';

const getPlaces = async () => {
    try {
        const facilities = await db.facility.findMany({
            select: {
                id: true,
                name: true,
                node: {
                    select: {
                        x_coord: true,
                        y_coord: true,
                    }
                },
                category: {
                    select: { name: true }
                }
            },
        });

        const rooms = await db.room.findMany({
            select: {
                id: true,
                building_id: true,
                name: true,
                x_coord: true,
                y_coord: true,
                category: {
                    select: { name: true }
                }
            },
            where: {
                category: {
                    // Ensures that the category is not null
                    isNot: null
                }
            }
        });

        return { facilities: facilities, rooms: rooms };
    } catch (error: any) {
        console.error(error.message);
        throw error;
    }
}

export const GET = async () => {
    try {
        const results = await getPlaces();
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
    }
}
