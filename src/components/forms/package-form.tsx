"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { use, useState } from "react";
import { z } from "zod";
import { ResponsiveDialog } from "../features/form-controllers/responsive-dialog";
import { Input } from "../features/form-controllers/input";
import { toast } from "@/hooks/use-toast";
import SelectBox from "../features/form-controllers/select-box";
import { addPackages } from "@/app/(authenticated)/packages/action";

const formSchema = z.object({
  status: z.enum(["draft", "archived", "published"]),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  student: z.string(),
  instrument: z.number(),
  duration: z
    .number()
    .positive()
    .int()
    .or(z.string())
    .pipe(z.coerce.number().positive().int()),
  start_datetime: z.string(),
  end_datetime: z.string(),
  remarks: z.string(),
  lessons_quota: z
    .number()
    .positive()
    .int()
    .or(z.string())
    .pipe(z.coerce.number().positive().int()),
});
type Student = {
  users: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }[];
};

type Instrument = {
  id: string;
  name: string;
};
type PackageProps = {
  students: Promise<Student[]>;
  instruments: Promise<Instrument[]>;
};

const PackageForm = ({ students, instruments }: PackageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const studentList = use(students);
  const instrumentList = use(instruments);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "draft",
      name: "",
      student: "",
      instrument: 0,
      duration: 0,
      start_datetime: "",
      end_datetime: "",
      remarks: "",
      lessons_quota: 0,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    dataForm
  ) => {
    setLoading(true);
    const response = await addPackages({ data: dataForm });
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
        title="Add Package"
        description="Please fill the form below to add a new package."
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                control={form.control}
                name="name"
                label="Name"
                placeholder="Ex : Guitar"
              />
              <SelectBox
                control={form.control}
                name="status"
                label="Status"
                options={[
                  { id: "draft", name: "Draft" },
                  { id: "archived", name: "Archived" },
                  { id: "published", name: "Publised" },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectBox
                control={form.control}
                name="student"
                label="Student"
                options={studentList[0].users.map((student) => ({
                  id: student.id,
                  name: `${student.first_name} ${student.last_name}`,
                }))}
              />
              <SelectBox
                control={form.control}
                name="instrument"
                label="Instrument"
                options={instrumentList}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                control={form.control}
                name="duration"
                label="Duration"
                placeholder="Ex : 90"
                type="number"
              />
              <Input
                control={form.control}
                name="lessons_quota"
                label="Lessons Quota"
                placeholder="Ex : 18"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                name="end_datetime"
                label="End Date"
                placeholder="Ex : 2024-10-18T09:50:51.305Z"
                type="datetime-local"
                className="w-fit md:w-full"
              />
            </div>
            <Input
              control={form.control}
              name="remarks"
              label="Remarks"
              placeholder="Ex : This package is for beginners."
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
        <span className="hidden sm:flex">Add Package</span>
      </Button>
    </>
  );
};

export default PackageForm;
