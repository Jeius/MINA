import { getFacilities } from "@/api/prisma-Fetchers"
import SearchField from "@/components/ui/search-field";



const ExploreTab = async () => {
    // const facilities = await getFacilities();
    // console.log(facilities);
    return (
        <section className="absolute grid grid-rows-2 grid-cols-1 justify-center top-0 left-0 right-0 z-10">
            <form role="search" className='relative flex w-full justify-center'>
                <SearchField className='relative m-4 py-2 px-4' placeholder="Search for places" />
            </form>
            <ul className='relative flex w-full justify-center'></ul>
        </section>
    )
}

export default ExploreTab