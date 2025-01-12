import LessonForm from "@/components/forms/lesson-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUsers } from "@/lib/action";
import { directus } from "@/lib/directus";
import { Lesson } from "@/types";
import { readItem } from "@directus/sdk";
import { NotebookText } from "lucide-react";
import { cookies } from "next/headers";
import SingleMenu from "./single-menu";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = (await directus(token).request(
    readItem("lessons", (await params).id, {
      fields: [
        "id",
        "status",
        "remarks",
        "start_datetime",
        "package",
        {
          teacher: ["id", "first_name", "last_name", "email"],
        },
      ],
      sort: "-date_created",
      offset: 0,
      limit: 150,
    })
  )) as Lesson;
  return <SingleMenu data={response} teachers={getUsers("Teacher")} />;
}
