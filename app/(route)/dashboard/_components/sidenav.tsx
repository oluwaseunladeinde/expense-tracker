'use client';

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const menuList = [
    {
        id: 1,
        name: 'Dashboard',
        icon: LayoutGrid,
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'Budgets',
        icon: PiggyBank,
        path: '/dashboard/budgets'
    },
    {
        id: 3,
        name: 'Expenses',
        icon: ReceiptText,
        path: '/dashboard/expenses'
    },
    {
        id: 4,
        name: 'Upgrade',
        icon: ShieldCheck,
        path: '/dashboard/upgrade'
    }
];

const SideNav = () => {
    const path = usePathname();
    return (
        <div className='h-screen p-5 border-r shadow-sm items-center'>
            <div>
                <Image
                    src={'/logo.svg'}
                    alt='logo'
                    width={160}
                    height={100}
                    className='mb-8'
                />
                {menuList.map((menu, index) => (
                    <Link
                        key={index}
                        href={menu.path}
                        className={cn(
                            'flex gap-2 items-center text-gray-500 font-medium p-5 mb-2 cursor-pointer rounded-md hover:text-primary hover:bg-primary/10',
                            path === menu.path && "text-white bg-primary hover:bg-primary hover:text-white font-semibold rounded-md"
                        )}>
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNav
