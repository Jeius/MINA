"use client"

import { BeatLoader, CircleLoader, MoonLoader, PulseLoader } from "react-spinners"
import { LoaderSizeMarginProps } from "react-spinners/helpers/props"

export const MyBeatLoader = (props: LoaderSizeMarginProps) => {
    return (
        <BeatLoader {...props} />
    )
}

export const MyPulseLoader = (props: LoaderSizeMarginProps) => {
    return (
        <PulseLoader {...props} />
    )
}

export const MyCircleLoader = (props: LoaderSizeMarginProps) => {
    return (
        <CircleLoader {...props} />
    )
}

export const MyMoonLoader = (props: LoaderSizeMarginProps) => {
    return (
        <MoonLoader {...props} />
    )
}