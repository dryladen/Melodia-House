"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Instrument = {
  id: number;
  name: string;
  students : string[];
  teachers : string[];
};

export const columns: ColumnDef<Instrument>[] = [
  {
    accessorKey: "id",
    header: "ID",
    meta: {
      className: "hidden",
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return <ActionColumn row={row} />;
  //   },
  // },
];