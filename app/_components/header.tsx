'use client';

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';

const Header = () => {

    const { isSignedIn } = useUser();
    return (
        <div className='flex items-center justify-between p-5 border shadow-sm'>
            <Image
                src={'logo.svg'}
                alt="logo"
                height={100}
                width={160}
            />
            {isSignedIn ? (<UserButton />) : (<Link href="/sign-in"><Button>Get Started</Button></Link>)}
        </div>
    )
}

export default Header
