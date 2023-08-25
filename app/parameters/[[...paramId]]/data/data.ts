import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const ParametersPageList: ParametersPage[] = [
  {
    id: "satprm",
    name: "Satış Parametreleri",
    tbl: "TBLSFATUPRM",
    data: async () => {
      const items = await prisma.$queryRaw`select * from TBLSFATUPRM`
      return JSON.stringify(items)
    },
    cols: [
      { id: "C_YEDEK16", name: "Koşul Uygulaması", type: "boolean" },
      { id: "SATIRBAZIKOSUL", name: "Satır Bazı Koşul ", type: "boolean" },
      { id: "SUBE_KODU", name: "Şube Kodu", type: "string" },
      { id: "ACIKLAMA", name: "Açıklama", type: "boolean" },
      { id: "MAL_BAZI_ISKONTOSU", name: "Mal Bazı İskonto", type: "boolean" },
      { id: "OZEL_KOD1", name: "Özel Kod 1", type: "boolean" },
      { id: "OZEL_KOD2", name: "Özel Kod 2", type: "boolean" },
      { id: "FAT_ALTM1_VARMI", name: "Fatura Alt Maliyet 1", type: "boolean" },
      {
        id: "FAT_ALTM1_TANIM",
        name: "Fatura Alt Maliyet 1 Tanım",
        type: "string",
      },
      { id: "FAT_ALTM2_VARMI", name: "Fatura Alt Maliyet 2", type: "boolean" },
      {
        id: "FAT_ALTM2_TANIM",
        name: "Fatura Alt Maliyet 2 Tanım",
        type: "string",
      },
    ],
    prCols: ["SUBE_KODU"],
  },
  {
    id: "subeparam",
    name: "Şirket-Şube Parametreleri",
    tbl: "TBLPARAM",
    data: async () => {
      const items = await prisma.$queryRaw`select * from TBLPARAM`
      return JSON.stringify(items)
    },
    cols: [
      { id: "SUBE_KODU", name: "Şube Kodu", type: "string" },
      { id: "LOCAL_DEPO", name: "Lokal Depo Uygulaması", type: "boolean" },
      { id: "YEDEK11", name: "Proje Uygulaması", type: "boolean" },
      { id: "PLASIYER_VAR", name: "Plasiyer Uygulaması", type: "boolean" },
    ],
    prCols: ["SUBE_KODU"],
  },
]

type ParametersPage = {
  id: string
  name: string
  tbl: string
  data: () => Promise<string>
  cols: ParameterItemType[]
  prCols: string[]
}

export type ParameterItemType = {
  id: string
  name: string
  type: ParameterInputType
}

export type ParameterInputType = "string" | "number" | "boolean"
