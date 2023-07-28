import { PrismaClient } from "@prisma/client"

import { ReportColumnType } from "@/types/table"

const prisma = new PrismaClient()

type ReportType = {
  id: string
  name: string
  data: () => Promise<string>
  columns: ReportColumnType[]
}

export const reports: ReportType[] = [
  {
    id: "1",
    name: "Rapor 1 deneme",
    data: async () => {
      const items =
        await prisma.$queryRaw`select '1' as id, convert(varchar,RAND())+ ' baslik' as title `
      return JSON.stringify(items)
    },
    columns: [
      { key: "id", text: "Id" },
      { key: "title", text: "Title" },
    ],
  },
  {
    id: "2",
    name: "Rapor 2 deneme",
    data: async () => {
      const items = await prisma.$queryRaw`select  * from tblsthar`
      return JSON.stringify(items)
    },
    columns: [
      { key: "STOK_KODU", text: "Stock Code" },
      { key: "FISNO", text: "Fişno" },
      { key: "STHAR_TARIH", text: "Tarih" },
      { key: "STHAR_GCMIK", text: "Miktar" },
      { key: "STHAR_NF", text: "Fiyat" },
    ],
  },

  {
    id: "3",
    name: "Rapor 3 deneme",
    data: async () => {
      const items = await prisma.$queryRaw`select * from tblstsabit`
      return JSON.stringify(items)
    },
    columns: [
      { key: "STOK_KODU", text: "Id" },
      { key: "STOK_ADI", text: "Adı" },
      { key: "GRUP_KODU", text: "GRUPKOD" },
      { key: "KOD_1", text: "K1" },
    ],
  },
]
