"use client"

//helper
import { ColumnDef } from "@tanstack/react-table"

import { ReportColumnType } from "@/types/table"

import { DataTableColumnHeader } from "../../tasks/components/data-table-column-header"

export const getColumns = (columns: ReportColumnType[]): ColumnDef<any>[] => {
  return columns.map((col) => ({
    accessorKey: col.key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={col.text} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue(col.key)}</div>,
    enableSorting: true,
    enableHiding: true,
  }))
}
/*
export const columns1o: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
]

export const column2o: ColumnDef<any>[] = getColumns([
  { key: "STOK_KODU", text: "Stock Code" },
  { key: "FISNO", text: "Fişno" },
  { key: "STHAR_TARIH", text: "Tarih" },
  { key: "STHAR_GCMIK", text: "Miktar" },
  { key: "STHAR_NF", text: "Fiyat" },
])
export const column3o: ColumnDef<any>[] = getColumns([
  { key: "STOK_KODU", text: "Id" },
  { key: "STOK_ADI", text: "Adı" },
  { key: "GRUP_KODU", text: "GRUPKOD" },
  { key: "KOD_1", text: "K1" },
])
*/
