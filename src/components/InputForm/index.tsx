"use client";

import { TypeOf, z } from "zod";
import { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type InputFormProps<T extends z.ZodType<any, any>> = {
  form: UseFormReturn<z.infer<T>>;
  name: Path<TypeOf<T>>;
  onChangeCapture: (value: string) => void;
  isPending?: boolean;
  type: string;
  label: string;
  placeholder: string; // Make placeholder an optional prop
};

export function InputForm<T extends z.ZodType<any, any>>({
  form,
  name,
  type,
  label,
  isPending,
  onChangeCapture,
  placeholder,
}: InputFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={isPending}
              placeholder={placeholder} // Spread the placeholder prop correctly
              onChangeCapture={(e) => onChangeCapture(e.currentTarget.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
