import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { taskSchema } from "./data/schema"
import RefreshComp from "./refreshComp"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

export const revalidate = 10 // revalidate every

const prisma = new PrismaClient()

// Simulate a database read for tasks.
async function getTasks() {
  /* const data = await fs.readFile(
    path.join(process.cwd(), "app/tasks/data/tasks.json")
  )*/
  //const tasks = JSON.parse(data.toString())

  //return z.array(taskSchema).parse(tasks)

  try {
    const tableName = ""
    const items = await prisma.$queryRaw`select * from TBLFATUIRS`
    //console.log("items selected from mssql")
    return z.array(taskSchema).parse(items)
    //return JSON.stringify(items)
  } catch (error) {
    throw new Error("Sql Hata" + error)
  }
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 sm:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
            <RefreshComp />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
