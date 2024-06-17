
import { db } from '@/lib/utils';
import { NextResponse } from 'next/server';


type Facility = {
    id: string,
    name: string,
    category: {
        name: string,
    },
    node: {
        x_coord: number,
        y_coord: number
    }
}

type Room = {
    id: string,
    name: string,
    category: {
        name: string,
    },
    x_coord: number,
    y_coord: number,
}

const createData = (facilities: any, rooms: any) => {
    const newFacilities = facilities.map((f: Facility) => ({
        id: `F${f.id}`,
        name: f.name,
        category: f.category.name,
        position: [f.node.y_coord, f.node.x_coord],
    }));
    const newRooms = rooms.map((r: Room) => ({
        id: `R${r.id}`,
        name: r.name,
        category: r.category.name,
        position: [r.y_coord, r.x_coord],
    }));

    return newFacilities.concat(newRooms);
}

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

        return createData(facilities, rooms);
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
