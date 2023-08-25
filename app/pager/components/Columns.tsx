"use client"

//helper
import { ColumnDef } from "@tanstack/react-table"

import { ReportColumnType } from "@/types/table"

import { DataTableColumnHeader } from "../../tasks/components/data-table-column-header"
import { NetsisRestParamType } from "../data/pages"
import { DataTableRowActions } from "./data-table-row-actions"

export const getColumns = (
  columns: ReportColumnType[],
  primaryCols: string[],
  NetsisRestParams: NetsisRestParamType
): ColumnDef<any>[] => {
  const cols: ColumnDef<any>[] = columns.map((col) => ({
    accessorKey: col.key,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={col.text} />
    ),
    cell: ({ row }) => {
      switch (col.type) {
        case "date":
          return (
            <div className="w-[80px]">
              {dateFormat(row.getValue(col.key) as string)}
            </div>
          )
        case "options":
          return (
            <div className="w-[80px]">
              {col.options?.find(
                (option) => option.value === row.getValue(col.key)
              )?.label ?? row.getValue(col.key)}
            </div>
          )
        default:
          return <div className="w-[80px]">{row.getValue(col.key)}</div>
      }
    },
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    enableGlobalFilter: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  }))

  return [
    ...cols,
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          primaryCols={primaryCols}
          NetsisRestParams={NetsisRestParams}
        />
      ),
    },
  ]
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

function dateFormat(dateStr: string) {
  if (dateStr === "" || !dateStr || dateStr == undefined) return ""

  const datePart = dateStr.split("T")
  const date = datePart[0]

  const [year, month, day] = date.split("-")

  return [day, month, year].join(".")
}
