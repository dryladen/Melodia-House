"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./action-column";
import { Package } from "@/types";

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "id",
    header: "ID",
    meta: {
      className: "hidden",
    },
  },

  {
    header: "Name",
    accessorKey: "name",
    meta: { className: "hidden sm:table-cell" },
  },

  {
    id: "student",
    accessorKey: "student.first_name",
    header: "Student",
    meta: { className: "text-start w-fit" },
  },
  {
    id: "instrument",
    accessorKey: "instrument.name",
    header: "Instrument",
  },
  {
    accessorKey: "duration",
    header: "Duration",
    meta: { className: "hidden sm:table-cell text-center" },
  },
  {
    header : "Status",
    accessorKey: "status",
    meta: { className: "hidden sm:table-cell text-center capitalize" },
  },
  {
    accessorKey: "start_datetime",
    meta: { className: "hidden sm:table-cell" },
    header: "Start Date",
    cell: ({ row }) => {
      const start_datetime = new Date(row.getValue("start_datetime"));
      const formattedDate = start_datetime.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "end_datetime",
    meta: { className: "hidden sm:table-cell" },
    header: "End Date",
    cell: ({ row }) => {
      const end_datetime = new Date(row.getValue("end_datetime"));
      const formattedDate = end_datetime.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionColumn row={row} />;
    },
  },
];
