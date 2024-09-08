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

import { Loader2, PenBox, Trash } from 'lucide-react';
import { deleteBudget } from '@/lib/actions/budget.actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useOpenBudget } from '@/features/budgets/hooks/use-open-budget';

const TitleHeader = ({ budgetId, budgetName }: { budgetId: string, budgetName: string }) => {
    const router = useRouter();
    const { onOpen } = useOpenBudget();
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteBudget = async () => {
        setIsLoading(true);
        try {
            const res = await deleteBudget(budgetId);
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
            <h2 className='font-bold text-3xl'>{budgetName}</h2>
            <div className='flex gap-2 items-center'>
                <Button size={"sm"} variant={'outline'} onClick={() => { onOpen(budgetId) }}>
                    <PenBox className="size-4 mr-2" />
                    Edit
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button disabled={isLoading} className='flex gap-2 text-rose-700' variant={'outline'}>
                            {isLoading ? <Loader2 className='h-4 w-4 animate-spin text-gray-500' /> : <Trash className='h-4 w-4' />}
                            Delete
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
                            <AlertDialogAction className='bg-rose-700 text-white' onClick={() => onDeleteBudget()}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    )
};

export default TitleHeader;