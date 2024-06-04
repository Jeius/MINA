import { getFacilities } from "@/api/prisma-Fetchers"



const ExploreTab = async () => {
    const facilities = await getFacilities();
    console.log(facilities);
    return (
        <section className='absolute top-0 left-0 right-0'></section>
    )
}

export default ExploreTab