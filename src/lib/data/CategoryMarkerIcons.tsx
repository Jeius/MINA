import {
    BuildingSVG,
    CampusSVG,
    ClinicSVG,
    CollegeSVG,
    ConstructionSVG,
    ExpandSVG,
    FoodSVG,
    HallSVG,
    HostelSVG,
    LaboratorySVG,
    LibrarySVG,
    LocationSVG,
    OfficeSVG,
    ParkSVG,
    SchoolSVG,
    SecuritySVG,
    SportsSVG
} from "@/components/ui/icons";
import { cn } from "../utils";


export const getCategoryMarkers = (category?: string) => {
    const categoryMarkerIcons: { [key: string]: React.ReactNode } = {
        'building': <CategoryMarkerIcon category={category} className='fill-building stroke-building-dark' />,
        'college': <CategoryMarkerIcon category={category} className='fill-college stroke-college-dark' />,
        'clinic': <CategoryMarkerIcon category={category} className='fill-clinic stroke-clinic-dark' />,
        'food': <CategoryMarkerIcon category={category} className='fill-food stroke-food-dark' />,
        'hall': <CategoryMarkerIcon category={category} className='fill-hall stroke-hall-dark' />,
        'hostel': <CategoryMarkerIcon category={category} className='fill-hostel stroke-hostel-dark' />,
        'laboratory': <CategoryMarkerIcon category={category} className='fill-laboratory stroke-laboratory-dark' />,
        'library': <CategoryMarkerIcon category={category} className='fill-library stroke-library-dark' />,
        'office': <CategoryMarkerIcon category={category} className='fill-office stroke-office-dark' />,
        'park': <CategoryMarkerIcon category={category} className='fill-park stroke-park-dark' />,
        'school': <CategoryMarkerIcon category={category} className='fill-school stroke-school-dark' />,
        'security': <CategoryMarkerIcon category={category} className='fill-security stroke-security-dark' />,
        'sports': <CategoryMarkerIcon category={category} className='fill-sports stroke-sports-dark' />,
        'under construction': <CategoryMarkerIcon category={category} className='fill-underConstruction stroke-underConstruction-dark' />,
        'cluster': <CategoryMarkerIcon category={category} className='fill-slate-700 stroke-slate-800' />,
        'campus': <CategoryMarkerIcon category={category} className='fill-primary stroke-primary-dark' />,
        'default': <CategoryMarkerIcon className='fill-slate-700 stroke-slate-800' />,
    }

    return category ? categoryMarkerIcons[category] : categoryMarkerIcons['default'];
}

type CategoryMarkerIconProps = React.HTMLAttributes<HTMLElement> & {
    category?: string,
}


const CategoryMarkerIcon = ({
    category = 'default',
    className,
    ...props
}: CategoryMarkerIconProps) => {
    const categoryIcons: { [key: string]: React.ReactNode } = {
        'building': <BuildingSVG className='relative size-full fill-white' />,
        'college': <CollegeSVG className='relative size-full fill-white' />,
        'clinic': <ClinicSVG className='relative size-full fill-white' />,
        'food': <FoodSVG className='relative size-full fill-white' />,
        'hall': <HallSVG className='relative size-full fill-white' />,
        'hostel': <HostelSVG className='relative size-full fill-white' />,
        'laboratory': <LaboratorySVG className='relative size-full fill-white' />,
        'library': <LibrarySVG className='relative size-full fill-white' />,
        'office': <OfficeSVG className='relative size-full fill-white' />,
        'park': <ParkSVG className='relative size-full fill-white' />,
        'school': <SchoolSVG className='relative size-full fill-white' />,
        'security': <SecuritySVG className='relative size-full fill-white' />,
        'sports': <SportsSVG className='relative size-full fill-white' />,
        'under construction': <ConstructionSVG className='relative size-full fill-white' />,
        'cluster': <ExpandSVG className='relative size-full fill-white' />,
        'campus': <CampusSVG className='relative size-full fill-white' />
    }

    return (
        <>
            <LocationSVG className={cn(`relative size-full`, className)} {...props} />
            <div className="absolute inset-y-[9px] inset-x-[8.5px] size-[17px]">
                {category && categoryIcons[category]}
            </div>
        </>
    )
}

export default CategoryMarkerIcon