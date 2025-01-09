"use server";

import { directus } from "@/lib/directus";
import { login } from "@directus/sdk";


export async function loginAction(email: string, password: string) {
  try {
    const response = await directus().request(login(email, password ));
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
