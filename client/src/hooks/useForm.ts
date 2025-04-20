import { useForm as useHookForm, UseFormProps, FieldValues, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface IUseFormProps<T extends FieldValues> extends UseFormProps<T> {
  schema: ZodSchema;
}

export const useForm = <T extends FieldValues>({
  schema,
  ...formConfig
}: IUseFormProps<T>): UseFormReturn<T> => {
  return useHookForm<T>({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};