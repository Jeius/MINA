import { SearchField, SearchResult } from "@/components/ui/search";

const ExploreTab = async () => {
    return (
        <section role="Search" className="absolute left-0 right-0 w-full max-w-xl place-self-center flex flex-col p-3 z-10">
            <SearchField placeholder="Search for places" />
            <SearchResult />
        </section>
    )
}

export default ExploreTab