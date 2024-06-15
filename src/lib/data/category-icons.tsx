import {
    BuildingSVG,
    ClinicSVG,
    CollegeSVG,
    ConstructionSVG,
    FoodSVG,
    HallSVG,
    HostelSVG,
    LaboratorySVG,
    LibrarySVG,
    OfficeSVG,
    ParkSVG,
    SchoolSVG,
    SecuritySVG,
    SportsSVG
} from "@/components/ui/icons";


export const getCategoryIcons = (category?: string) => {
    const categoryIcons: { [key: string]: React.ReactNode } = {
        'building': <BuildingSVG className='relative size-full fill-building' />,
        'college': <CollegeSVG className='relative size-full fill-college' />,
        'clinic': <ClinicSVG className='relative size-full fill-clinic' />,
        'food': <FoodSVG className='relative size-full fill-food' />,
        'hall': <HallSVG className='relative size-full fill-hall' />,
        'hostel': <HostelSVG className='relative size-full fill-hostel' />,
        'laboratory': <LaboratorySVG className='relative size-full fill-laboratory' />,
        'library': <LibrarySVG className='relative size-full fill-library' />,
        'office': <OfficeSVG className='relative size-full fill-office' />,
        'park': <ParkSVG className='relative size-full fill-park' />,
        'school': <SchoolSVG className='relative size-full fill-school' />,
        'security': <SecuritySVG className='relative size-full fill-security' />,
        'sports': <SportsSVG className='relative size-full fill-sports' />,
        'under construction': <ConstructionSVG className='relative size-full fill-underConstruction' />,
    }

    return category && categoryIcons[category];
}