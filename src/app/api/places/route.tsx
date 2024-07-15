
import { Place } from '@/lib/fetchers';
import { db } from '@/lib/utils';
import { Decimal } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

type Facility = {
    id: string | number,
    name: string,
    category: {
        name: string,
    },
    node: {
        x_coord: Decimal,
        y_coord: Decimal,
    }
};

type Room = {
    id: string | number,
    name: string,
    category: { name: string } | null,
    facility: { name: string },
    x_coord: Decimal,
    y_coord: Decimal,
};

type Facilities = Facility[];

type Rooms = Room[];

const createData = (facilities: Facilities, rooms: Rooms) => {
    const newFacilities = facilities.map((f: Facility): Place => ({
        id: `F${f.id}`,
        name: f.name,
        category: f.category.name,
        position: [f.node.y_coord.toNumber(), f.node.x_coord.toNumber()],
    }));
    const newRooms = rooms.map((r: Room): Place => ({
        id: `R${r.id}`,
        name: r.name,
        facility: r.facility.name,
        category: r.category && r.category.name,
        position: [r.y_coord.toNumber(), r.x_coord.toNumber()],
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
                },
                facility: {
                    select: { name: true }
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
