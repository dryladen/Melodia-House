"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { use, useState } from "react";
import { z } from "zod";
import { Input } from "../features/form-controllers/input";
import { toast } from "@/hooks/use-toast";
import SelectBox from "../features/form-controllers/select-box";
import { User } from "@/types";
import { ResponsiveDialog } from "../features/form-controllers/responsive-dialog";
import {
  addLesson,
  updateLesson,
} from "@/app/(authenticated)/packages/[id]/action";

const formSchema = z.object({
  status: z.enum(["attended", "absent"]),
  teacher: z.string().nonempty("Teacher is required."),
  start_datetime: z.string().nonempty("Start Date is required."),
  remarks: z.string(),
  package: z.number(),
});

type LessonProps = {
  teachers: Promise<User[]>;
  defaultValues?: z.infer<typeof formSchema>;
  id_lesson?: number;
};

const LessonForm = ({ teachers, defaultValues, id_lesson }: LessonProps) => {
  const [loading, setLoading] = useState(false);
  const teacherList = use(teachers);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    dataForm
  ) => {
    setLoading(true);
    let response;
    console.log(dataForm);
    if (id_lesson) {
      response = await updateLesson({ id: id_lesson, data: dataForm });
    } else {
      response = await addLesson({ data: dataForm });
      form.reset();
    }
    toast({
      title: response.title,
      description: response.message,
      variant: response.success === true ? "success" : "destructive",
    });
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full"
        >
          <SelectBox
            control={form.control}
            name="status"
            label="Status"
            options={[
              { id: "attended", name: "Attended" },
              { id: "absent", name: "Absent" },
            ]}
          />
          <SelectBox
            control={form.control}
            name="teacher"
            label="Teacher"
            options={teacherList.map((teacher) => ({
              id: teacher.id,
              name: `${teacher.first_name} ${teacher.last_name}`,
            }))}
          />
          <Input
            control={form.control}
            name="start_datetime"
            label="Start Date"
            placeholder="Ex : 2024-05-20T04:11:11.103Z"
            type="datetime-local"
            className="w-fit md:w-full"
          />
          <Input
            control={form.control}
            name="remarks"
            label="Remarks"
            placeholder="Ex : This package is for beginners."
          />
          <Input
            control={form.control}
            name="package"
            label="Package"
            disabled
          />
          <Button
            type="submit"
            className="w-full font-bold"
            {...(loading && { disabled: true })}
          >
            {loading && <LoaderCircle size={24} className="animate-spin" />}
            {id_lesson ? "Update Lesson" : "Add Lesson"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LessonForm;
