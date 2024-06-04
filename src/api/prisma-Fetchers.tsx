import prisma from './prisma';


export const getFacilities = async () => {
    try {
        return await prisma.facility.findMany();
    } catch (error: any) {
        console.error(error.message);
    }
}