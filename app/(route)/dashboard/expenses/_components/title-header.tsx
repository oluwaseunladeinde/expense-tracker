"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Loader2, Trash } from 'lucide-react';
import { deleteBudget } from '@/lib/actions/budget.actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const TitleHeader = ({ budgetId }: { budgetId: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const onDeleteBUdget = async () => {
        setIsLoading(true);
        try {
            const res = await deleteBudget(Number(budgetId));
            console.log({ res });
            toast.success("Deleted budget.")
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete budget")
        }
        setIsLoading(false);
        router.push('/dashboard/budgets');
    }

    return (
        <div className='flex items-center justify-between'>
            <h2 className='font-bold text-3xl'>My Expenses</h2>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button disabled={isLoading} className='flex gap-2' variant={'destructive'}>
                        {isLoading ? <Loader2 className='h-4 w-4 animate-spin text-white' /> : <Trash className='h-4 w-4 text-white' />}
                        Delete Budget
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will delete your budget along with expenses
                            and remove your data from our servers permanently.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className='bg-rose-700 text-white' onClick={() => onDeleteBUdget()}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};

export default TitleHeader;