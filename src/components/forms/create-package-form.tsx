"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResponsiveDialog } from "../features/form-controllers/responsive-dialog";
import PackageForm from "./package-form";
import { PlusCircle } from "lucide-react";
import { User, Instrument } from "@/types";


type PackageProps = {
  students: Promise<User[]>;
  instruments: Promise<Instrument[]>;
};

const CreatePackageForm = ({ students, instruments }: PackageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Package"
        description="Please fill the form below to add a new package."
      >
        <PackageForm
          students={students}
          instruments={instruments}
          defaultValues={{
            id: 0,
            status: "draft",
            name: "",
            student: "",
            instrument: 0,
            duration: 0,
            start_datetime: new Date().toISOString(),
            end_datetime: new Date().toISOString(),
            remarks: "",
            lessons_quota: 0,
          }}
        />
      </ResponsiveDialog>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <PlusCircle size={16} />
        <span className="hidden sm:flex">Add Package</span>
      </Button>
    </>
  );
};

export default CreatePackageForm;
