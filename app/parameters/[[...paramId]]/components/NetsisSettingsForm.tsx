"use client"

import { useState } from "react"
import ApiService from "@/services/apiService"
import { DynamicObject } from "@/types"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { ParameterInputType, ParameterItemType } from "../data/data"

export function NetsisSettingsForm({
  id,
  title,
  columns,
  data,
  prCols,
}: {
  id: string
  title: string
  columns: ParameterItemType[]
  data: any
  prCols: string[]
}) {
  const parsedData: DynamicObject[] = JSON.parse(data)
  const [items, setItems] = useState<DynamicObject[]>(parsedData)
  const [updatedItems, setUpdatedItems] = useState<DynamicObject[]>(
    parsedData.map((_data) => ({}))
  )
  const [showAllParams, setShowAllParams] = useState<boolean[]>(
    parsedData.map((_d) => false)
  )

  /**function onCheckBoxChangeHandler(
    id: BooleanKeysOfItemType,
    i: number,
    value: boolean
  ) {
    const updatedItems = [...items]
    updatedItems[i][id] = value
    setItems(updatedItems)
  }

  function onInputChangeHandler(
    id: StringKeysOfItemType,
    i: number,
    value: string
  ) {
    const updatedItems = [...items]
    updatedItems[i][id] = value
    setItems(updatedItems)
  } 
  
  function onIsShowChangeHandler(value: boolean, i: number) {
    console.log(value, i)
    const updatedItems = [...items]
    updatedItems[i].isShow = !!value
    setItems(updatedItems)
  }
*/

  const apiService = new ApiService()

  const parameterChangeHandler = (
    id: string,
    value: string | boolean,
    index: number
  ) => {
    const UpdatedItems = [...updatedItems]

    UpdatedItems[index][id] =
      typeof value == "boolean" ? (value ? "E" : "H") : value
    setUpdatedItems(UpdatedItems)

    const changedItems = [...items]
    changedItems[index][id] =
      typeof value == "boolean" ? (value ? "E" : "H") : value

    setItems(changedItems)
  }

  const saveClickHandlder = async (i: number) => {
    const whr = prCols.reduce(
      (acc, cur) => ({ ...acc, [cur]: items[i][cur] }),
      {}
    )

    const newData = updatedItems[i]

    const result = await apiService.post("/api/parameters/1?paramId=" + id, {
      newData,
      whr,
    })
  }

  const toogleShowAll = (i: number, checked: boolean) => {
    const newArray = [...showAllParams]
    newArray[i] = checked

    setShowAllParams(newArray)
  }

  const filteredColumns = columns.filter((col) => !prCols.includes(col.id))
  return (
    <>
      {/*JSON.stringify(updatedItems, null, 2)*/}
      {items.map((item, i) => (
        <Card key={i} className=" w-1/2">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {prCols.reduce(
                (acc, cur) =>
                  `${acc}  ${columns.find((col) => col.id == cur)?.name} : ${
                    items[i][cur]
                  } `,
                ""
              )}
            </CardDescription>
            <div className="">
              <Label htmlFor="necessary" className="flex flex-col mx-1">
                <span>Show Others</span>
              </Label>
              <Switch
                checked={showAllParams[i]}
                onCheckedChange={(checked) => toogleShowAll(i, checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-1">
            {filteredColumns.map((column) => (
              <div
                key={column.id}
                className="flex items-center border-b justify-between space-y-1"
              >
                <Label
                  htmlFor="necessary"
                  className="flex flex-col space-y-1 w-2/3"
                >
                  <span>{column.name}</span>
                  <span className="font-normal text-xxs leading-snug text-muted-foreground">
                    {column.id}
                  </span>
                </Label>
                <div className="w-1/3">
                  <ParameterInput
                    type={column.type}
                    value={item[column.id]}
                    index={i}
                    onParamChange={(value, index) =>
                      parameterChangeHandler(column.id, value, index)
                    }
                  />
                </div>
              </div>
            ))}
            {showAllParams[i] && (
              <>
                {Object.keys(item)
                  .filter(
                    (a) =>
                      ![
                        ...filteredColumns.map((c) => c.id),
                        ...prCols,
                      ].includes(a)
                  )
                  .map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between space-x-2 border-b"
                    >
                      <Label
                        htmlFor="necessary"
                        className="flex flex-col space-y-1 w-2/3"
                      >
                        <span>{key}</span>
                      </Label>
                      <div className="w-1/3">
                        <ParameterInput
                          type="string"
                          value={item[key]}
                          index={i}
                          onParamChange={(value, index) =>
                            parameterChangeHandler(key, value, index)
                          }
                        />
                      </div>
                    </div>
                  ))}
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-1/2" onClick={() => saveClickHandlder(i)}>
              Save
            </Button>

            {/**<Button
              variant="outline"
              className="w-full"
              onClick={() => setShowAllParams(!showAllParams)}
            >
              Show All
            </Button> */}
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

const ParameterInput = ({
  type,
  value,
  index,
  onParamChange,
  ...rest
}: {
  type: ParameterInputType
  value: string
  index: number
  onParamChange: (value: string | boolean, index: number) => void
}) => {
  switch (type) {
    case "boolean":
      return (
        <>
          <Switch
            checked={value == "E" ? true : false}
            value={value == "E" ? "E" : "H"}
            onCheckedChange={(checked) => onParamChange(checked, index)}
            {...rest}
          />
        </>
      )

    default:
      return (
        <Input
          {...rest}
          value={value}
          type={type}
          onChange={(e) => onParamChange(e.target.value, index)}
        />
      )
  }
}
