import Search from "@/app/explore/search";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const InfoSheet = dynamic(() => import('@/components/info-sheet'), { ssr: false });

type ExploreTabProps = {
    params: {},
    searchParams: { [key: string]: string | string[] | undefined };
};

const ExploreTab = async () => {
    return null;
};

export default ExploreTab;
