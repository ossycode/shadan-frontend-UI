import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ContentForm, ContentSchema } from "@/schemas/post";

export function useContentForm(
  onSubmit: (data: ContentForm) => void,
  defaultValues?: Partial<ContentForm>
) {
  const methods = useForm<ContentForm>({
    resolver: zodResolver(ContentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return {
    ...methods,
    onSubmit: handleSubmit(onSubmit),
    isDirty,
  };
}
