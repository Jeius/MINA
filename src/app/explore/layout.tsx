import { cn } from '@/lib/utils'
import Search from '@/app/explore/search'
import React, { Suspense } from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Suspense>
            <section role='search' className={cn(
                'relative w-full max-w-xl place-self-center',
                'flex flex-col p-3 z-10 pointer-events-auto',
            )}>
                <Search />
            </section >
            {children}
        </Suspense>

    )
}

export default Layout