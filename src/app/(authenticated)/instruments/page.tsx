import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionData } from "./action-data";
import { Speech, Users } from "lucide-react";
import InstrumentForm from "@/components/forms/instrument-form";
import { Instrument } from "@/types";

export default async function page() {
  const token = (await cookies()).get("directus_session_token");
  // if token is not found
  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Directus session token not found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  // fetch instruments
  const result = (await directus(token.value).request(
    readItems("instruments", {
      fields: ["id", "name", "students", "teachers"],
    })
  )) as Instrument[];
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-2">
            <CardTitle>Intruments</CardTitle>
            <CardDescription> List of instruments</CardDescription>
          </div>
          <InstrumentForm />
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {result.map((instrument) => (
            <li
              className="p-4 border-[1px] rounded-md flex flex-col"
              key={instrument.id}
            >
              <div className="flex justify-between items-center w-full">
                <h2 className="font-bold">{instrument.name}</h2>
                <ActionData id={instrument.id} />
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <Users size={16} />
                  <span className="text-sm">{instrument.students.length}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Speech size={16} />
                  <span className="text-sm">{instrument.teachers.length}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
