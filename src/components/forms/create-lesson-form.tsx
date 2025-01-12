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
import LessonForm from "./lesson-form";

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
  disable_btn?: boolean;
};

const CreateLessonForm = ({ teachers, disable_btn }: LessonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Lesson"
        description="Please fill the form below to add a new package."
      >
        <LessonForm
          teachers={teachers}
          defaultValues={{
            status: "attended",
            teacher: "",
            start_datetime: new Date().toISOString(),
            remarks: "",
            package: 0,
          }}
        />
      </ResponsiveDialog>
      <Button
        {...(disable_btn && { disabled: true })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <PlusCircle size={16} />
        <span className="hidden sm:flex">Add Lesson</span>
      </Button>
    </>
  );
};

export default CreateLessonForm;
