import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getColumns } from "../components/Columns"
import { PageDataTable } from "../components/PagerDataTable"
import { pages } from "../data/pages"
import { ReportList } from "./reportList"

type DataType = { id: string; title: string }

const Page = async ({ params }: { params: { pageId: string } }) => {
  if (!params.pageId) return <PageList />

  const activePage = pages.find((page) => page.id == params.pageId)

  if (!activePage) return notFound()

  const data = (await activePage.data()) as string

  //const columns = getColumns(activePage[0].columns) //activePage[0].columns
  //const data =  await prisma.$queryRaw`select '1' as id, convert(varchar,RAND())+ ' baslik' as title `
  // console.log(data)

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 sm:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {activePage.name}
          </h2>
        </div>
      </div>
      <PageDataTable
        data={JSON.parse(data)}
        cols={activePage.columns}
        primaryCols={activePage.primaryCols}
        NetsisRestParams={activePage.NetsisRestParams}
        filters={activePage.columns
          .filter((col) => col.filter)
          .map((col) => ({
            key: col.key,
            title: col.text,
            options: col.options ?? [],
          }))}
      />
    </div>
  )
}

export default Page
export const dynamic = "force-dynamic"
export const revalidate = 1

const PageList = () => {
  return (
    <>
      <ul className="flex flex-col">
        {pages.map((page) => (
          <li key={page.id} className="m-2 border-b-2 p-2">
            <Link href={`/pager/${page.id}`}>{page.name}</Link>
          </li>
        ))}
      </ul>
      {/*<ReportList />*/}
    </>
  )
}

export const metadata: Metadata = {
  title: {
    default: "Pages",
    template: ``,
  },
  description: "",
}
