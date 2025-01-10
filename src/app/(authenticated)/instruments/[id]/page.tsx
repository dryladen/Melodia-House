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
      fields: ["id", "name", "students", "teachers"],
    })
  )) as Instrument;
  return <div>{response.name}</div>;
}
