import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { directus } from "@/lib/directus";
import { Instrument } from "@/types";
import { readItem } from "@directus/sdk";
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
  )) as Instrument ;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{response.name}</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 grid ">
              {response.students.length != 0 && response.students.map((student : any) => (
                <li key={student.id} className="flex items-center space-x-4 border p-4 rounded-md">
                  {student.students_id.first_name} {student.students_id.last_name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {response.teachers.length != 0 && response.teachers.map((teacher : any) => (
                <li key={teacher.id} className="flex items-center space-x-4">
                  <span>{teacher.teachers_id.first_name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
