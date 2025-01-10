"use client"
import { Row } from "@tanstack/react-table";
import { Delete, MoreHorizontal, ReceiptText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import DeleteDialog from "@/components/features/form-controllers/delete-dialog";
// import { toast } from "@/components/ui/use-toast";

export function ActionData({ row } : {row : any}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <DeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        actionFn={async () => {
          // let response = await deleteProduct(row.getValue("id"));
          // toast({
          //   title: response.message,
          //   variant: response.success === true ? "default" : "destructive",
          // });
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Fitur</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/products/${row.id}`}
              className="flex items-center bg-white p-1 w-full rounded-sm justify-start"
            >
              <ReceiptText className="h-4 w-4 mr-2 text-gray-500" />
              <span>Details</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={() => setDeleteOpen(true)}
              className="p-1 w-full justify-start h-fit border-0 bg-white hover:bg-white text-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2 " />
              <span>Hapus</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}