
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // Avoid hot-reloading issue in development mode
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
}

export default prisma;


export const search = async (query: string) => {
    try {
        const facilities = await prisma.facility.findMany({
            select: { id: true, name: true },
            where: { name: query }
        })

        console.log(facilities);

        return facilities;
    } catch (error: any) {
        console.error(error.message);
    }
}