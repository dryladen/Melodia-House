"use server";

import { directus } from "@/lib/directus";
import { getErrorMessage } from "@/lib/utils";
import { createItem, deleteItem } from "@directus/sdk";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addInstrument(name: string) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    const response = await directus(token).request(
      createItem("instruments", { name })
    );
    if (response) {
      revalidatePath("/instruments");
      return {
        title: "Instrument added successfully.",
        success: true,
        message: "The instrument has been added successfully.",
      };
    } else {
      return {
        title: "Failed to add instrument.",
        success: false,
        message: "An error occurred while adding the instrument.",
      };
    }
  } catch (error) {
    return {
      title: "Failed to add instrument.",
      success: false,
      message: getErrorMessage(error)
    };
  }
}

export async function deleteInstrument(id: number) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    await directus(token).request(deleteItem("instruments", id));
    revalidatePath("/instruments");
    return {
      title: "Instrument deleted successfully.",
      success: true,
      message: "The instrument has been deleted successfully.",
    };
  } catch (error) {
    return {
      title: "Failed to delete instrument.",
      success: false,
      message: getErrorMessage(error)
    };
  }
}
