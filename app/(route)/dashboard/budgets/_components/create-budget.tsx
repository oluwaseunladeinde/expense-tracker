"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CreateBudgetForm } from './forms/create-budget-form';

export const CreateBudget = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="flex flex-col bg-slate-100 p-10 rounded-10 items-center border-2 border-dashed cursor-pointer hover:shadow-sm ">
                        <h2 className="text-3xl">+</h2>
                        <h2>Create New Budget </h2>
                    </div>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>New Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <CreateBudgetForm openDialog={setOpen} />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
};