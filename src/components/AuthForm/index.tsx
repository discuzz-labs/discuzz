import { z } from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { InputForm } from "@/components/InputForm";

interface FormProps<T extends z.ZodType<any, any, any>> {
  schema: T;
  formSubmitted: boolean;
  callbackFn: (values: z.infer<T>) => void;
  fields: Array<{ name: Path<z.infer<T>>, type: string, placeholder: string, label?: string }>;
  submitBtnText?: string | undefined;
}

export default function AuthForm<T extends z.ZodType<any, any>>({
  schema,
  formSubmitted,
  callbackFn,
  fields,
  submitBtnText
}: FormProps<T>) {
  const form = useForm<z.infer<T>>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(callbackFn)}
        className="w-full flex flex-col items-center justify-center gap-5"
      >
        {fields.map((field) => (
          <InputForm<T>
            key={field.name}
            form={form}
            name={field.name}
            className="w-1/2"
            onChangeCapture={() => {}}
            type={field.type}
            isPending={formSubmitted}
            placeholder={field.placeholder}
            label={field.label}
          />
        ))}
        <div className="w-full flex items-center flex-col gap-5 mt-5">
          <Button
            disabled={formSubmitted}
            type="submit"
            className="w-1/2 flex items-center gap-2"
          >
            {formSubmitted && <Spinner />} {submitBtnText ? submitBtnText : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
