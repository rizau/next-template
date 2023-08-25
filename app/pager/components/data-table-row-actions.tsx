"use client"

import { useState } from "react"
import { notFound, useRouter } from "next/navigation"
import ApiService from "@/services/apiService"
import { DynamicObject } from "@/types"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import useNotification from "@/hooks/useNotification"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

import { NetsisRestParamType } from "../data/pages"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  primaryCols: string[]
  NetsisRestParams: NetsisRestParamType
}

export function DataTableRowActions<TData>({
  row,
  primaryCols,
  NetsisRestParams,
}: DataTableRowActionsProps<TData>) {
  const task = row.original as DynamicObject

  const apiService = new ApiService()
  const { toast } = useToast()
  const { notify } = useNotification()
  const router = useRouter()
  const test = () => {
    // toast({ title: "test", description: "deneme" + Math.random() })

    notify("test", "deneme" + Math.random(), "default")

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const FaturaTip = {
    ftSFat: "1",
    ftAFat: "2",
    ftSIrs: "3",
    ftAIrs: "B",
    ftDepo: "",
    ftLokalDepo: "",
    ftASip: "",
    ftSSip: "",
    ftAmbarG: "9",
    ftAmbarC: "8",
    ftSSIrs: "",
    ftSAIrs: "",
    ftAlTalep: "",
    ftAlTeklif: "",
    ftSatTalep: "",
    ftSatTeklif: "",
    ftSPSIrs: "",
    ftSPAIrs: "",
  }

  const enumCols = ["FTIRSIP"]

  function getKeyByValue(object: DynamicObject, value: string) {
    console.log(object, value)
    return Object.keys(object).find((key) => object[key] === value)
  }

  const [isloading, setIsLoading] = useState<boolean>(false)
  // if (isloading) return notFound()

  const deleteHandler = async () => {
    const id = primaryCols
      .map((prmrCol) => {
        console.log(prmrCol, enumCols.includes(prmrCol))
        if (enumCols.includes(prmrCol)) {
          return getKeyByValue(FaturaTip, task[prmrCol])
        } else {
          return task[prmrCol]
        }
      })
      .join(";")
    //console.log(id, NetsisRestParams.url, FaturaTip.ftSfat)

    const result = await apiService.delete(
      `/api/nrest?id=${id}&url=${NetsisRestParams.url}&rand=${Math.random()}`
    )
    console.log("result", result)

    if (result.isOk) {
      notify("Belge Silindi.", result.message, "success")
      /*     toast({
        title: "Belge silindi.",
        description: result.message,
        variant: "default",
      }) */
      router.refresh()
    } else {
      notify("Silme başarısız!", result.message, "danger")

      /*   toast({
        title: "Silme başarısız",
        description: result.message,
        variant: "destructive",
      }) */
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Copy</DropdownMenuItem>
        <DropdownMenuItem onClick={test}>Test</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled>Labels</DropdownMenuSubTrigger>
          {/** <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>*/}
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteHandler}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
