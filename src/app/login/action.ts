"use server";

import directus from "@/lib/directus";



export async function login(email: string, password: string) {
  const response = await directus.login(email, password);
  console.log(response);
  return response;
}
