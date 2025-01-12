"use server";

import { directus } from "@/lib/directus";
import { getErrorMessage } from "@/lib/utils";
import { login } from "@directus/sdk";


export async function loginAction(email: string, password: string) {
  try {
    await directus().request(login(email, password ));
    return {
      message: "Login successful",
      success: true,
    };
  } catch (error) {
    
    return {
      message: `Login failed - please check your email and password : ${getErrorMessage(error)}`,
      success : false,
    };
  }
}
