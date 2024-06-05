import { getFacilities } from "@/api/prisma-Fetchers"
import SearchField from "./ui/search-field";



const ExploreTab = async () => {
    // const facilities = await getFacilities();
    // console.log(facilities);
    return (
        <section className='absolute flex justify-center top-0 left-0 right-0'>
            <SearchField className='relative m-4 py-2 px-4' placeholder="Search for places" />
        </section>
    )
}

export default ExploreTab