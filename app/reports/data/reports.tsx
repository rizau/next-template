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
  {
    id: "4",
    name: "Rapor 4 özel parametreler",
    data: async () => {
      const items = await prisma.$queryRaw`select * from netsis..prgozelprm`
      return JSON.stringify(items)
    },
    columns: [
      { key: "GRUPKOD", text: "Grup" },
      { key: "ANAHTAR", text: "Anahtar" },
      { key: "DEGER", text: "Değer" },
      { key: "SIRKET_KODU", text: "Şirket" },
      { key: "SUBE_KODU", text: "Şube" },
    ],
  },
  {
    id: "5",
    name: "Rapor 5 CümleUpdate50",
    data: async () => {
      const items =
        await prisma.$queryRaw`select TOP 100000 SIRKET,INCKEYNO,ZAMAN,ISTEKNO,LOGINNAME,PCNAME,DBVERSIYON,OK,CONVERT(VARCHAR(max),HATA) AS HATA from netsis..cumleupdate50 ORDER BY ZAMAN DESC`
      return JSON.stringify(items)
    },
    columns: [
      { key: "SIRKET", text: "Şirket" },
      { key: "INCKEYNO", text: "Inckeyno" },
      { key: "ZAMAN", text: "Zaman" },
      { key: "ISTEKNO", text: "İstekno" },
      { key: "LOGINNAME", text: "Login Name" },
      { key: "PCNAME", text: "PC Name" },
      { key: "DBVERSIYON", text: "Db Versiyon" },
      { key: "OK", text: "Ok" },
      { key: "HATA", text: "Hata" },
    ],
  },
]
