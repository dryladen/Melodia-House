"use client";
import LessonForm from "@/components/forms/lesson-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lesson, User } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
type LessonProps = {
  teachers: Promise<User[]>;
  data: Lesson;
  id_lesson?: number;
  disable_btn?: boolean;
};

export default function SingleMenu({ data, teachers }: LessonProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center p-6 rounded-md bg-background border">
        <Button
          variant={"outline"}
          className="px-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold">Lessons Details</h1>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold">Main Data</h2>
          <Separator />
        </CardHeader>
        <CardContent>
          <LessonForm
            teachers={teachers}
            id_lesson={data.id}
            defaultValues={{
              status: data.status,
              teacher: data.teacher.id,
              start_datetime: data.start_datetime,
              remarks: data.remarks,
              package: data.package,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
