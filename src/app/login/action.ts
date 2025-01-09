"use server";

import directus from "@/lib/directus";

export async function login(email: string, password: string) {
  try {
    const response = await directus.login(email, password);
    return {
      message: "Login successful",
      success: true,
    };
  } catch (error) {
    return {
      message: "Login failed - please check your email and password",
      success : false,
    };
  }
}
