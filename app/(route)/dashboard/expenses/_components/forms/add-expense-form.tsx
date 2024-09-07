"use client";

import { z } from "zod";
import Image from "next/image";
import toast from 'react-hot-toast';

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";

import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { ExpenseFormValidation } from "@/lib/validations";
import { createExpense } from "@/lib/actions/expense.actions";


const AddExpenseForm = ({ budgetId }: { budgetId: string }) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof ExpenseFormValidation>>({
        resolver: zodResolver(ExpenseFormValidation),
        defaultValues: {
            name: "",
            amount: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof ExpenseFormValidation>) => {
        setIsLoading(true);
        try {
            const expense: AddExpenseParams = {
                name: values.name,
                amount: String(values.amount),
                budgetId,
            };
            const newBudget = await createExpense(expense);

            if (newBudget) {
                toast.success("Expense creation was succesful.");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
            toast.error("Budget creation failed.");
        }
        setIsLoading(false);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Expense Name"
                    placeholder="e.g. Food"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="amount"
                    label="Expense Amount"
                    placeholder="$5000"
                />
                <SubmitButton className="mt-5 w-full" isLoading={isLoading}>Add New Expense</SubmitButton>
            </form>
        </Form>
    )
}

export default AddExpenseForm