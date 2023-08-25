"use client"

import { useState } from "react"
import ApiService from "@/services/apiService"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ItemType = {
  nesne: string
  label: string
  required: boolean
  isShow: boolean
  isUpdatable: boolean
  defaultValue: string
}
type itemsType = ItemType[]

const data: itemsType = [
  {
    nesne: "STOK_KODUDB",
    label: "Stok Kodu",
    required: true,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "STOK_ADI",
    label: "Stok Adı",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "INGISIM",
    label: "İngilizce İsim",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "KDV_ORANI",
    label: "Satış Kdv Oranı",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "ALIS_KDV_ORANI",
    label: "Alış Kdv Oranı",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "RISK_SURESI",
    label: "Risk Süresi",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "ZAMAN_BIRIMI",
    label: "Zaman Birimi",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "MUH_DETAYKODU",
    label: "Muh. Detay",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
  {
    nesne: "DEPO_KODU",
    label: "Depo Kodu",
    required: false,
    isShow: true,
    isUpdatable: true,
    defaultValue: "",
  },
]

export default function Pages() {
  const [items, setItems] = useState<itemsType>(data)

  function onIsShowChangeHandler(value: boolean, i: number) {
    console.log(value, i)
    const updatedItems = [...items]
    updatedItems[i].isShow = !!value
    setItems(updatedItems)
  }

  type FilterKeysByValueType<T, ValueType> = {
    [K in keyof T]: T[K] extends ValueType ? K : never
  }[keyof T]
  type BooleanKeysOfItemType = FilterKeysByValueType<ItemType, boolean>
  type StringKeysOfItemType = FilterKeysByValueType<ItemType, string>

  function onCheckBoxChangeHandler(
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

  const [activeTab, setActiveTab] = useState<string>("tab1")

  //  const test = `HOST: ${process.env.HOSTNAME} PORT: ${process.env.PORT} `

  const apiService = new ApiService()

  const testFunc = async () => {
    const data = await apiService.get("/api/test")
    console.log(data)
  }

  return (
    <div>
      <Button onClick={testFunc}>Test Function</Button>
      <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
        <TabsList>
          <TabsTrigger value="tab1" onClick={() => setActiveTab("tab1")}>
            Ekran Seçimi
          </TabsTrigger>
          <TabsTrigger value="tab2" onClick={() => setActiveTab("tab2")}>
            Alan Seçimi
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          Make changes to your account here.
          <div className="text-right">
            <Button onClick={() => setActiveTab("tab2")}>İleri</Button>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Görüntülensin</TableHead>
                <TableHead>Güncellenebilsin</TableHead>
                <TableHead>Nesne</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Zorunlu</TableHead>
                <TableHead>Varsılan Değer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Checkbox
                      defaultValue={item.isShow ? "true" : "false"}
                      checked={item.isShow}
                      disabled={item.required && item.defaultValue == ""}
                      onCheckedChange={(value) =>
                        onCheckBoxChangeHandler("isShow", i, !!value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      defaultValue={item.isUpdatable ? "true" : "false"}
                      checked={item.isUpdatable}
                      onCheckedChange={(value) =>
                        onCheckBoxChangeHandler("isUpdatable", i, !!value)
                      }
                    />
                  </TableCell>
                  <TableCell>{item.nesne}</TableCell>
                  <TableCell>
                    <Input
                      value={item.label}
                      onChange={(event) =>
                        onInputChangeHandler("label", i, event.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      defaultValue={item.required ? "true" : "false"}
                      checked={item.required}
                      onCheckedChange={(value) => {
                        console.log(value)
                        onCheckBoxChangeHandler("required", i, !!value)
                        if (value) onCheckBoxChangeHandler("isShow", i, !!value)
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      value={item.defaultValue}
                      onChange={(event) =>
                        onInputChangeHandler(
                          "defaultValue",
                          i,
                          event.target.value
                        )
                      }
                      placeholder="..."
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right">
            <Button>Kaydet</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/*JSON.stringify(items, null, 2)*/}
    </div>
  )
}
