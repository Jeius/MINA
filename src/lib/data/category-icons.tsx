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




export const getCategoryIcons = ({ category, className }: { category?: string, className?: string }) => {
    const categoryIcons: { [key: string]: React.ReactNode } = {
        'building': <BuildingSVG className={className} />,
        'college': <CollegeSVG className={className} />,
        'clinic': <ClinicSVG className={className} />,
        'food': <FoodSVG className={className} />,
        'hall': <HallSVG className={className} />,
        'hostel': <HostelSVG className={className} />,
        'laboratory': <LaboratorySVG className={className} />,
        'library': <LibrarySVG className={className} />,
        'office': <OfficeSVG className={className} />,
        'park': <ParkSVG className={className} />,
        'school': <SchoolSVG className={className} />,
        'security': <SecuritySVG className={className} />,
        'sports': <SportsSVG className={className} />,
        'under construction': <ConstructionSVG className={className} />,
    }

    return category && categoryIcons[category];
}