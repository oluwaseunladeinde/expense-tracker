'use client';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    const { isSignedIn } = useUser();
    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manage Your Expense.
                        <strong className="font-extrabold text-primary sm:block"> Control Your Spend. </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Start creating your budget and save tons of money
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {isSignedIn ?
                            (<Link href="/dashboard"><Button>Visit Dashboard</Button></Link>) :
                            (<Link href="/sign-in"><Button>Get Started</Button></Link>)
                        }
                    </div>
                </div>
            </div>
            <Image
                src={'/dashboard.png'}
                alt='iamge'
                width={1000}
                height={700}
                className='mt-5 rounded-xl border-2'
            />
        </section>
    )
}

export default Hero
