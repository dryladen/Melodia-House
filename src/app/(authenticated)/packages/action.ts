"use server";
import { directus } from "@/lib/directus";
import { createItem, deleteItem, updateItem } from "@directus/sdk";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type PackageProps = {
  data: {
    status: "draft" | "archived" | "published";
    name: string;
    student: string;
    instrument: number;
    duration: number;
    start_datetime: string;
    end_datetime: string;
    remarks?: string | null;
    lessons_quota: number;
  };
};

export async function addPackages({ data }: PackageProps) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    const response = await directus(token).request(
      createItem("packages", data)
    );
    if (response) {
      revalidatePath("/packages");
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
    return {
      title: "Failed to add package.",
      success: false,
      message: "Name already exists.",
    };
  }
}
export async function updatePackage({ id, data }: { id: number; data: PackageProps["data"] }) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    const response = await directus(token).request(
      updateItem("packages",id, data)
    );
    console.log(response);
    if (response) {
      revalidatePath(`/packages/${id}`);
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
      message: "Name already exists.",
    };
  }
}

export async function deletePackage(id: number) {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;
    await directus(token).request(deleteItem("packages", id));
    revalidatePath("/packages");
    return {
      title: "Package deleted successfully.",
      success: true,
      message: "The package has been deleted successfully.",
    };
  } catch (error) {
    return {
      title: "Failed to delete package.",
      success: false,
      message: "An error occurred while deleting the package.",
    };
  }
}