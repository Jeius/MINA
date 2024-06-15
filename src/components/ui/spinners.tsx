"use client"

import { BeatLoader, PulseLoader } from "react-spinners"
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