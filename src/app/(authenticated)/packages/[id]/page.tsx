import PackageForm from "@/components/forms/package-form";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInstruments, getUsers } from "@/lib/action";
import { directus } from "@/lib/directus";
import { Package } from "@/types";
import { readItem } from "@directus/sdk";
import { AccordionItem } from "@radix-ui/react-accordion";
import { BookOpenCheck, Calendar, NotebookText, Speech } from "lucide-react";
import { cookies } from "next/headers";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = (await directus(token).request(
    readItem("packages", (await params).id, {
      fields: [
        "id",
        "status",
        "name",
        "duration",
        "start_datetime",
        "end_datetime",
        "lessons_quota",
        {
          instrument: ["id", "name"],
        },
        {
          student: ["id", "first_name", "last_name", "email"],
        },
        {
          lessons: [
            "id",
            "status",
            "remarks",
            "start_datetime",
            {
              teacher: ["id", "first_name", "last_name", "email"],
            },
          ],
        },
      ],
      sort: "-date_created",
      offset: 0,
      limit: 150,
    })
  )) as Package;
  const studentList = getUsers("Student");
  const instrumentList = getInstruments();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center p-6 rounded-md bg-background border">
        <NotebookText size={21} />
        <h1 className="text-2xl font-bold">Package Details</h1>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-bold">Main Data</h2>
          <Separator />
        </CardHeader>
        <CardContent>
          <PackageForm
            instruments={instrumentList}
            students={studentList}
            isUpdate
            defaultValues={{
              id: response.id,
              status: response.status,
              name: response.name,
              student: response.student.id,
              instrument: response.instrument.id,
              duration: response.duration,
              start_datetime: response.start_datetime,
              end_datetime: response.end_datetime,
              remarks: response.remarks || "",
              lessons_quota: response.lessons_quota,
            }}
          />
        </CardContent>
      </Card>
      <Card className="flex flex-col grow">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="lessons">
            <CardHeader>
              <AccordionTrigger>
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-bold">Lessons</h2>
                </div>
              </AccordionTrigger>
              <Separator />
            </CardHeader>
            <AccordionContent>
              <CardContent>
                <ul className="flex flex-col gap-4">
                    {[...response.lessons].reverse().map((lesson) => (
                    <li
                      key={lesson.id}
                      className="flex flex-col gap-2 border rounded-md p-4"
                    >
                      <div className="flex gap-2 items-center text-sm">
                        <BookOpenCheck size={16} />
                        <span className="font-bold hidden md:block">
                          Status:
                        </span>
                        <span
                          className={`capitalize ${
                            lesson.status === "absent"
                              ? "text-red-600"
                              : lesson.status === "attended"
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {lesson.status}
                        </span>
                      </div>
                      <div className="flex gap-2 text-sm items-center">
                        <Speech size={16} />
                        <span className="font-bold hidden md:block">
                          Teacher:
                        </span>
                        <h3>
                          {lesson.teacher.first_name} {lesson.teacher.last_name}
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center text-sm">
                        <Calendar size={16} />
                        <span className="font-bold hidden md:block">Date:</span>
                        <span>
                          {new Date(lesson.start_datetime).toLocaleString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      {lesson.remarks && (
                        <div className="flex gap-2 items-center text-sm">
                          <NotebookText size={16} />
                          <span className="font-bold hidden md:block">
                            Remarks:
                          </span>
                          <span>{lesson.remarks}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
