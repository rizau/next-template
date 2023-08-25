import { PrismaClient } from "@prisma/client"

import { ReportColumnType } from "@/types/table"

import NetsisOptionFields from "./filters"

const prisma = new PrismaClient()

export type FiltersType = {
  key: string
  title: string
  options: { value: string | number; label: string }[]
}

type PageType = {
  id: string
  name: string
  data: () => Promise<string>
  columns: ReportColumnType[]
  primaryCols: string[]
  NetsisRestParams: NetsisRestParamType
  //filters: FiltersType[]
}

export type NetsisRestParamType = { url: string }

export const pages: PageType[] = [
  {
    id: "invoices",
    name: "Fatura / İrsaliye / Ambar Fişleri",
    data: async () => {
      const items = await prisma.$queryRaw`select * from tblfatuirs`
      return JSON.stringify(items)
    },
    columns: [
      { key: "FATIRS_NO", text: "Belge No" },
      {
        key: "FTIRSIP",
        text: "Belge Türü",
        type: "options",
        filter: true,
        options: NetsisOptionFields.ftirsip,
      },
      { key: "CARI_KODU", text: "Cari Kodu" },
      {
        key: "TIPI",
        text: "Tipi",
        type: "options",
        filter: true,
        options: NetsisOptionFields.tipi,
      },
      { key: "TARIH", text: "Tarih", type: "date" },
      { key: "BRUTTUTAR", text: "Brüt Tutar" },
      { key: "ACIKLAMA", text: "Açıklama" },
      { key: "GENELTOPLAM", text: "Genel Toplam" },
    ],
    primaryCols: ["FTIRSIP", "FATIRS_NO", "CARI_KODU"],
    NetsisRestParams: { url: "ItemSlips" },
  },
  {
    id: "items",
    name: "Stoklar",
    data: async () => {
      const items = await prisma.$queryRaw`select * from tblstsabit`
      return JSON.stringify(items)
    },
    columns: [
      { key: "STOK_KODU", text: "Stok Kodu" },
      { key: "STOK_ADI", text: "Stok Adı" },
      { key: "GRUP_KODU", text: "Grup Kodu" },
      { key: "KOD_1", text: "Kod 1" },
      { key: "SAT_DOV_TIP", text: "Satış Döviz Tipi" },
      { key: "MUH_DETAYKODU", text: "Muh. Detay Kodu" },
      { key: "DEPO_KODU", text: "Depo Kodu" },
      { key: "KDV_ORANI", text: "Satış Kdv Oranı" },
    ],
    primaryCols: ["STOK_KODU"],
    NetsisRestParams: { url: "ItemS" },
  },
]
