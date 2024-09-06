"use client";

import { z } from "zod";
import Image from "next/image";
import toast from 'react-hot-toast';

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { BudgetFormValidation } from "@/lib/validations";

import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";
import { IconList } from "@/lib/constants";

import { SelectItem } from "@/components/ui/select";
import { createBudget } from "@/lib/actions/budget.actions";

export const CreateBudgetForm = ({ openDialog }: { openDialog: Dispatch<SetStateAction<boolean>> }) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof BudgetFormValidation>>({
        resolver: zodResolver(BudgetFormValidation),
        defaultValues: {
            name: "",
            amount: 0,
            icon: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof BudgetFormValidation>) => {
        setIsLoading(true);
        try {
            const budget: CreateBudgetParams = {
                name: values.name,
                amount: String(values.amount),
                icon: values.icon,
            };
            const newBudget = await createBudget(budget);

            if (newBudget) {
                toast.success("Budget creation was succesful.");
                openDialog(false);
                //router.push(`/patients/${newBudget}/register`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Budget creation failed.");
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="icon"
                    label="Icon"
                    placeholder="e.g. Smiley Face"
                >
                    {IconList.map((icon, i) => (
                        <SelectItem key={icon.name + i} value={icon.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={icon.image}
                                    width={32}
                                    height={32}
                                    alt="doctor"
                                    className="rounded-full"
                                />
                                <p>{icon.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="e.g. Food"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="amount"
                    label="Amount"
                    placeholder="$5000"
                />
                <SubmitButton className="mt-5 w-full" isLoading={isLoading}>Create Budget</SubmitButton>
            </form>
        </Form>
    )
}


