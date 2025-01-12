"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { User } from "@/types";
import { ResponsiveDialog } from "../features/form-controllers/responsive-dialog";
import LessonForm from "./lesson-form";

type LessonProps = {
  teachers: Promise<User[]>;
  package_id: number;
  disable_btn?: boolean;
};

const CreateLessonForm = ({ teachers, disable_btn, package_id }: LessonProps) => {
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
            package: package_id,
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
