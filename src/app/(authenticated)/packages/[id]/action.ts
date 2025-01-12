"use server";
import { directus } from "@/lib/directus";
import { getErrorMessage } from "@/lib/utils";
import { createItem, deleteItem, updateItem } from "@directus/sdk";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type LessonProp = {
  data: {
    status: "attended" | "absent";
    teacher: string;
    start_datetime: string;
    remarks?: string | null;
    package: number;
  };
};

export async function addLesson({ data }: LessonProp) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    const response = await directus(token).request(createItem("lessons", data));
    if (response) {
      revalidatePath(`/packages/${data.package}`);
      return {
        title: "Package added successfully.",
        success: true,
        message: "The package has been added successfully.",
      };
    } else {
      return {
        title: "Failed to add package.",
        success: false,
        message: "An error occurred while adding the package.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      title: "Failed to add package.",
      success: false,
      message: getErrorMessage(error),
    };
  }
}
export async function updateLesson({
  id,
  data,
}: {
  id: number;
  data: LessonProp["data"];
}) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    const response = await directus(token).request(
      updateItem("lessons", id, data)
    );
    if (response) {
      revalidatePath(`/lessons/${id}`);
      return {
        title: "Package updated successfully.",
        success: true,
        message: "The package has been updated successfully.",
      };
    } else {
      return {
        title: "Failed to add package.",
        success: false,
        message: "An error occurred while updating the package.",
      };
    }
  } catch (error) {
    return {
      title: "Failed to add package.",
      success: false,
      message: getErrorMessage(error)
    };
  }
}

export async function deleteLesson(id: number) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    await directus(token).request(deleteItem("lessons", id));
    revalidatePath("/lessons");
    return {
      title: "Package deleted successfully.",
      success: true,
      message: "The package has been deleted successfully.",
    };
  } catch (error) {
    return {
      title: "Failed to delete package.",
      success: false,
      message: getErrorMessage(error)
    };
  }
}
