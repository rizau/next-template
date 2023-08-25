import { NextResponse } from "next/server"
import NRestService from "@/services/nrestService"

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  //const id = searchParams.get('id')

  const nrest = new NRestService()

  const data = await nrest.get("arps")

  console.log("data from route", data)

  return NextResponse.json({ product: "test", data: data })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const url = searchParams.get("url")

  const nrest = new NRestService()

  const data = await nrest.delete(`${url}/${id}`)

  console.log("data from route", data)

  return NextResponse.json(data)
}

export const revalidate = 5
