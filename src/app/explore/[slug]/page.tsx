
import { Places } from '@/lib/model';
import dynamic from 'next/dynamic';
import React from 'react'

const InfoSheet = dynamic(() => import('@/components/info-sheet'), { ssr: false });

type Props = {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined };
};

export const generateStaticParams = async () => {
    const places = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/places`).then((res) => res.json()) as Places

    return places.map((place) => ({
        slug: place.facility ? `${place.name}, ${place.facility}` : place.name,
    }))
}

const Page: React.FC<Props> = ({ params }) => {
    return (
        <>
            <div className="flex flex-grow" />
            <InfoSheet selectedPlace={params.slug} />
        </>
    )
}

export default Page