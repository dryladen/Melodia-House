import { DataTable } from "@/components/features/datatables/data-table";
import { columns } from "./column";
import { directus } from "@/lib/directus";
import { cookies } from "next/headers";
import { readItems } from "@directus/sdk";
import { Package } from "@/types";
import PackageForm from "@/components/forms/package-form";
import { getInstruments, getStudents } from "@/lib/action";

export default async function page() {
  const token = (await cookies()).get("directus_session_token")?.value;
  const data = (await directus(token).request(
    readItems("packages", {
      fields: [
        "id",
        "name",
        "status",
        "duration",
        "start_datetime",
        "end_datetime",
        {
          student: ["id", "first_name", "last_name", "email"],
        },
        {
          instrument: ["id", "name"],
        },
      ], sort: "-date_created"
    })
  )) as Package[];

  const studentList =  getStudents();
  const instrumentList = getInstruments();
  // console.log(instrumentList);
  return (
    <>
      <DataTable
        title="Packages"
        columns={columns}
        data={data ? data : []}
        search="student"
        searchPlaceholder="Search student"
      >
        <PackageForm students={studentList} instruments={instrumentList}/>
      </DataTable>
    </>
  );
}
