"use server";

import directus from "@/lib/directus";

export async function login(email: string, password: string) {
  try {
    const response = await directus.login(email, password);
    return {
      data: response,
      success: true,
    };
  } catch (error) {
    return {
      success : false,
    };
  }
}
