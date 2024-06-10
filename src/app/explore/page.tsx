import { getFacilities } from "@/api/prisma-Fetchers"
import { SearchField } from "@/components/ui/search";



const ExploreTab = async () => {
    // const facilities = await getFacilities();
    // console.log(facilities);
    return (
        <section className="absolute grid grid-rows-2 grid-cols-1 justify-center top-0 left-0 right-0 z-10">
            <SearchField placeholder="Search for places" />
            <ul className='relative flex w-full justify-center'></ul>
        </section>
    )
}

export default ExploreTab