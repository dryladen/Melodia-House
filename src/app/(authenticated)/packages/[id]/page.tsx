import PackageForm from "@/components/forms/package-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInstruments, getUsers } from "@/lib/action";
import { directus } from "@/lib/directus";
import { Package } from "@/types";
import { readItem } from "@directus/sdk";
import { NotebookText} from "lucide-react";
import { cookies } from "next/headers";
import LessonList from "./lesson-list";
import PaymentList from "./payment-list";

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
        {
          payments: ["id", "payment_date", "rate", "currency"],
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
            id_package={response.id}
            defaultValues={{
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
      <LessonList
        lessons={response.lessons}
        package_id={response.id}
        lesson_quota={response.lessons_quota}
      />
      <PaymentList payments={response.payments} />
    </div>
  );
}
