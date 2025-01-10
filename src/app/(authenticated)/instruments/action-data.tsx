"use client";
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
import { deleteInstrument } from "./action";
import { toast } from "@/hooks/use-toast";

export function ActionData({ id }: { id: number }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <DeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        actionFn={async () => {
          let response = await deleteInstrument(id);
          toast({
            title: response.title,
            description: response.message,
            variant: response.success === true ? "success" : "destructive",
          });
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Button className="w-full" variant="outline">
              <Link href={`/instruments/${id}`} className="flex gap-2 items-center">
                <ReceiptText className="h-4 w-4" />
                <span>Detail</span>
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button className="w-full" onClick={() => setDeleteOpen(true)} variant={"destructive"}>
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
