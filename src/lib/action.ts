"use server";

import { cookies } from "next/headers";
import { directus } from "./directus";
import { readItems, readRoles } from "@directus/sdk";

type Student = {
  users : {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }[]
};

type Instrument = {
  id: string;
  name: string;
};

export async function getStudents() {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = await directus(token).request(
    readRoles({
      fields: [{ users: ["id", "first_name", "last_name", "email"] }],
      filter: { name: "Student" },
    })
  ) as Student[];
  return response;
}

export async function getInstruments() {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = await directus(token).request(
    readItems("instruments", {
      fields: ["id", "name"],
    })
  ) as Instrument[];
  return response;
}
