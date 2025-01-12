"use server";

import { cookies } from "next/headers";
import { directus } from "./directus";
import {
  authentication,
  createDirectus,
  readItems,
  readUsers,
} from "@directus/sdk";
import { Instrument, User } from "@/types";
import { redirect } from "next/navigation";

export async function getUsers(role: string) {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = (await directus(token).request(
    readUsers({
      fields: ["id", "first_name", "last_name", "email"],
      filter: { role: { name: role } },
      limit: 500,
    })
  )) as User[];
  return response;
}

export async function signout() {
  (await cookies()).delete("directus_session_token");
  redirect("/login");
}

export async function getInstruments() {
  const token = (await cookies()).get("directus_session_token")?.value;
  const response = (await directus(token).request(
    readItems("instruments", {
      fields: ["id", "name"],
    })
  )) as Instrument[];
  return response;
}
