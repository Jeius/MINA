import { getFacilities } from "@/api/prisma-Fetchers"
import SearchField from "@/components/ui/search-field";



const ExploreTab = async () => {
    // const facilities = await getFacilities();
    // console.log(facilities);
    return (
        <section className="z-50">
            <form role="search" className='absolute z-50 flex justify-center top-0 left-0 right-0'>
                <SearchField className='relative m-4 py-2 px-4' placeholder="Search for places" />
            </form>
        </section>
    )
}

export default ExploreTab