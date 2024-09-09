"use client";

import { z } from "zod";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";
import { IconList } from "@/lib/constants";

import { SelectItem } from "@/components/ui/select";
import { insertBudgetSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";


const formSchema = insertBudgetSchema.pick({
    name: true,
    amount: true,
    icon: true
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    budgetId: string;
    defaultValues: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled: boolean;
};

export const EditBudgetForm = ({ budgetId, defaultValues, onDelete, onSubmit, disabled }: Props) => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        console.log("Deleting...")
        onDelete?.();
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 space-y-6">
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
                <SubmitButton className="mt-5 w-full" isLoading={disabled}>Update Budget</SubmitButton>
                {!!budgetId && <Button
                    type="button"
                    disabled={disabled}
                    onClick={handleDelete}
                    className="w-full"
                    variant={"outline"}
                >
                    <Trash className="mr-2 size-4" />
                    Delete
                </Button>}
            </form>
        </Form>
    )
}


