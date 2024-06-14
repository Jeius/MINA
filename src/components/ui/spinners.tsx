"use client"

import { CSSProperties, HTMLAttributes } from "react"
import { BeatLoader } from "react-spinners"

export type LoadingProps = HTMLAttributes<HTMLElement> & {
    color?: string,
    size?: number | string,
    speedMultiplier?: number,
    margin?: number | string,
    loading?: boolean,
    cssOverride?: CSSProperties
}

export const MyBeatLoader = ({
    className,
    color,
    size,
    speedMultiplier,
    margin,
    loading,
    cssOverride,
}: LoadingProps) => {
    return (
        <BeatLoader
            className={className}
            color={color}
            size={size}
            speedMultiplier={speedMultiplier}
            margin={margin}
            loading={loading}
            cssOverride={cssOverride}
        />
    )
}
