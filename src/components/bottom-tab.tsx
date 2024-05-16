
import React from 'react'
import { GlassContainer } from './ui/glass-container'

const Tab: React.FC = () => {
    return (
        <GlassContainer className='absolute bottom-0 flex-none' height='h-14'>
            <button>Explore</button>
            <button>Directions</button>
            <button>Places</button>
        </GlassContainer>
    )
}

export default Tab
