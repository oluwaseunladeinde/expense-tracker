import { z } from "zod";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,

} from '@/components/ui/dialog'
import { PenBox } from 'lucide-react'
import React, { useState } from 'react'
import { EditBudgetForm } from '@/features/budgets/components/edit-budget-form';



const EditBudget = () => {

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogTrigger asChild>
                    <Button variant={'outline'} className='flex gap-2'>
                        <PenBox className="h-4 w-4" /> Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <EditBudgetForm
                                    budgetId={budgetId}
                                    onSubmit={onSubmit}
                                    disabled={isPending}
                                    defaultValues={defaultValues}
                                    onDelete={onDelete}
                                />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget