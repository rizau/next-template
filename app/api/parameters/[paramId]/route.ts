import { NextResponse } from "next/server"
import sequelize, { DbService } from "@/services/dbService"
import NRestService from "@/services/nrestService"

import { ParametersPageList } from "@/app/parameters/[[...paramId]]/data/data"

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  //const id = searchParams.get('id')

  const nrest = new NRestService()

  const data = await nrest.get("arps")

  console.log("data from route", data)

  return NextResponse.json({ product: "test", data: data })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("paramId")

  const body = await request.json()

  const param = ParametersPageList.find((params) => params.id == id)

  const { newData, whr } = body

  const db = DbService
  const result = await db.UpdateOne(param?.tbl ?? "", newData, whr)

  //const result = await sequelize.query("select * from tblstsabit")

  return NextResponse.json({ result })
}

export const revalidate = 5
