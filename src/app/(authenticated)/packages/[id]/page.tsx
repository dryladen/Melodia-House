import PackageForm from "@/components/forms/package-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInstruments, getUsers } from "@/lib/action";
import { directus } from "@/lib/directus";
import { Package } from "@/types";
import { readItem } from "@directus/sdk";
import { NotebookText } from "lucide-react";
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
    <Card className="flex flex-col grow ">
      <CardHeader className="flex gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold">Package Details</h1>
          <NotebookText size={21} />
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Main Data</h2>
          </CardHeader>
          <CardContent>
            <PackageForm
              instruments={instrumentList}
              students={studentList}
              defaultValues={{
                status: response.status,
                name: response.name,
                student: response.student.id,
                instrument: response.instrument.id,
                duration: response.duration,
                start_datetime: response.start_datetime,
                end_datetime: response.end_datetime,
                remarks: response.remarks,
                lessons_quota: response.lessons.length,
              }}
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col grow">
          <CardHeader>
            <h2 className="text-lg font-bold">Lessons</h2>
          </CardHeader>
          <CardContent>
            <div>
              {response.lessons.map((lesson) => (
                <div key={lesson.id} className="flex flex-col gap-2">
                  <h3 className="text-base font-bold">
                    {lesson.teacher.first_name} {lesson.teacher.last_name}
                  </h3>
                  <p>{lesson.remarks}</p>
                  <p>{lesson.start_datetime}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
