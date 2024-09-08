"use client";

import { z } from "zod";
import Image from "next/image";
import { insertBudgetSchema } from "@/db/schema";
import { Loader2, Trash } from "lucide-react";
import { IconList } from "@/lib/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "@/components/custom-form-field";
import { BudgetFormValidation } from "@/lib/validations";

const formSchema = insertBudgetSchema.pick({
    name: true,
    amount: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

export const BudgetForm = ({ id, defaultValues, onDelete, onSubmit, disabled = false }: Props) => {

    const form = useForm<z.infer<typeof BudgetFormValidation>>({
        resolver: zodResolver(BudgetFormValidation),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        console.log('values submitted', { values });
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
                <Button className="w-full" disabled={disabled}>
                    {disabled && (
                        <Loader2 className="size-4 mr-2 animate-spin text-sky-700" />
                    )}
                    {id ? "Save changes" : "Create Budget"}
                </Button>
                {!!id && <Button
                    type="button"
                    disabled={disabled}
                    onClick={handleDelete}
                    className="w-full"
                    variant={"outline"}
                >
                    <Trash className="mr-2 size-4" />
                    Delete Budget
                </Button>}
            </form>
        </Form>
    )
}


