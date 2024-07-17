import { cn } from "@/lib/utils"
import { MyPulseLoader } from "./spinners";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const glass = "drop-shadow-lg backdrop-blur-md bg-black bg-opacity-70";
  return (
    <div
      className={cn("animate-pulse rounded-md dark:bg-gray-700", glass, className)}
      {...props}
    />
  )
}

export const CustomSkeleton = () => {
  const align = 'flex flex-row place-content-center place-items-center items-end';
  const bg = 'bg-transparent';
  const skeletonStyle = `relative w-full text-sm ${align} ${bg}`;
  return (
    <Skeleton className={skeletonStyle} >
      <span className='mr-1'>Searching</span>
      <MyPulseLoader className='mb-1' color="#ffffff" size={3} speedMultiplier={0.5} />
    </Skeleton>
  );
}