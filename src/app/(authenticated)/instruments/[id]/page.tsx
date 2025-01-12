import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { directus } from "@/lib/directus";
import { Instrument, Student } from "@/types";
import { readItem } from "@directus/sdk";
import { Guitar, Speech, Users } from "lucide-react";
import { cookies } from "next/headers";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = (await directus(token).request(
    readItem("instruments", (await params).id, {
      fields: [
        "id",
        "name",
        {
          students: [
            "id",
            { students_id: ["id", "first_name", "last_name", "email"] },
          ],
        },
        {
          teachers: [
            "id",
            { teachers_id: ["id", "first_name", "last_name", "email"] },
          ],
        },
      ],
    })
  )) as Instrument;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <h1>Piano</h1>
          <Guitar size={24} />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Separator />
        <div className="grid gap-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">Students</h2>
            <Users size={16} />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {response.students.length != 0 &&
              response.students.map((student : Student) => (
                <li
                  key={student.id}
                  className="flex items-center space-x-4 border p-4 rounded-md"
                >
                  {student.students_id.first_name}{" "}
                  {student.students_id.last_name}
                </li>
              ))}
          </ul>
        </div>
        <Separator className="mt-6" />
        <div className="grid gap-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">Teachers</h2>
            <Speech size={16} />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {response.teachers.length != 0 &&
              response.teachers.map((teacher) => (
                <li
                  key={teacher.id}
                  className="flex items-center space-x-4 border p-4 rounded-md"
                >
                  {teacher.teachers_id.first_name}{" "}
                  {teacher.teachers_id.last_name}
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
