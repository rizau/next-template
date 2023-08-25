"use client"

import { useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

//import { priorities, statuses } from "../data/data"
import { DataTableFacetedFilter } from "../../tasks/components/data-table-faceted-filter"
import { DataTableViewOptions } from "../../tasks/components/data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [filteredColumn, setFilteredColumn] = useState<string>(
    table.getAllColumns()[0].id
  )

  function filteredColumnChangeHandler(value: string) {
    table.resetColumnFilters()
    setFilteredColumn(value)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Select
          onValueChange={(value) => filteredColumnChangeHandler(value)}
          value={filteredColumn}
        >
          <SelectTrigger className="h-8 w-[100px] lg:w-[150px]">
            <SelectValue placeholder="Seç" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {table.getAllColumns().map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          placeholder="Filter ..."
          value={
            (table.getColumn(filteredColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filteredColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/*JSON.stringify(table.getColumn("FISNO")?.getFilterValue(), null, 2)*/}
        {/*table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )*/}
        {/*table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
