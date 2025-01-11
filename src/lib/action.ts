"use server";

import { cookies } from "next/headers";
import { directus } from "./directus";
import { readItems, readRoles, readUsers } from "@directus/sdk";
import { Instrument, User } from "@/types";

export async function getUsers(role: string) {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = await directus(token).request(
    readUsers({
      fields: ["id", "first_name", "last_name", "email"],
      filter: { role: { name: role } },
      limit: 500,
    })
  ) as User[];
  return response;
}
export async function getRoles() {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = await directus(token).request(
    readUsers({
      fields: ["id", "first_name", "last_name", "email", { role: ["name"] }],
      filter: { role: { name: "Student" } },
    })
  ) as User[];
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
