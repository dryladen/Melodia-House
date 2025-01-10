"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { ResponsiveDialog } from "../features/form-controllers/responsive-dialog";
import { Input } from "../features/form-controllers/input";
import { addInstrument } from "@/app/(authenticated)/instruments/action";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type Props = {
  defaultValues: z.infer<typeof formSchema>;
};

const InstrumentForm = ({ defaultValues }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setLoading(true);
    const response = await addInstrument(data.name);
    toast({
      title: response.title,
      description: response.message,
      variant: response.success === true ? "success" : "destructive",
    });
    form.reset();
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Instrument"
        description="Please fill the form below to add a new instrument."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              control={form.control}
              name="name"
              label="Name"
              placeholder="Ex : Guitar"
            />
            <Button
              type="submit"
              className="w-full"
              {...(loading && { disabled: true })}
            >
              {loading && <LoaderCircle size={24} className="animate-spin" />}
              Save
            </Button>
          </form>
        </Form>
      </ResponsiveDialog>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <PlusCircle size={16} />
        <span className="hidden sm:flex">Add Instrument</span>
      </Button>
    </>
  );
};

export default InstrumentForm;
