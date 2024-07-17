import { AnimatedDiv } from "./ui/animated"


const InfoSheet = ({ place }: { place: string | string[] | undefined }) => {

    return (place &&
        <AnimatedDiv className="w-full h-42 pointer-events-auto">
            Sheet
        </AnimatedDiv>
    )
}

export default InfoSheet