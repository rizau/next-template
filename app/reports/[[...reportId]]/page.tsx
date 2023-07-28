import Link from "next/link"
import { notFound } from "next/navigation"

import { getColumns } from "../components/Columns"
import { ReportDataTable } from "../components/ReportDataTable"
import { reports } from "../data/reports"
import { ReportList } from "./reportList"

type DataType = { id: string; title: string }

const Page = async ({ params }: { params: { reportId: string } }) => {
  if (!params.reportId) return <Reports />

  const activeReport = reports.filter((report) => report.id == params.reportId)

  if (activeReport.length == 0) return notFound()

  const data = (await activeReport[0].data()) as string
  //const columns = getColumns(activeReport[0].columns) //activeReport[0].columns
  //const data =  await prisma.$queryRaw`select '1' as id, convert(varchar,RAND())+ ' baslik' as title `
  // console.log(data)

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 sm:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {activeReport[0].name}
          </h2>
          <p className="text-muted-foreground">Description {Math.random()}</p>
        </div>
      </div>
      <ReportDataTable data={JSON.parse(data)} cols={activeReport[0].columns} />
    </div>
  )
}

export default Page
export const dynamic = "force-dynamic"
export const revalidate = 5

const Reports = () => {
  return (
    <>
      <ul className="flex flex-col">
        {reports.map((report) => (
          <li key={report.id} className="m-2 border-b-2 p-2">
            <Link href={`/reports/${report.id}`}>{report.name}</Link>
          </li>
        ))}
      </ul>
      {/*<ReportList />*/}
    </>
  )
}
