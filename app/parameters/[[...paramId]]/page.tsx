import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { NetsisSettingsForm } from "@/app/parameters/[[...paramId]]/components/NetsisSettingsForm"

import { ParametersPageList } from "./data/data"

export default async function ParametersPage({
  params,
}: {
  params: { paramId: string }
}) {
  /*
  type FilterKeysByValueType<T, ValueType> = {
    [K in keyof T]: T[K] extends ValueType ? K : never
  }[keyof T]
  type BooleanKeysOfItemType = FilterKeysByValueType<ItemType, boolean>
  type StringKeysOfItemType = FilterKeysByValueType<ItemType, string>
*/
  const paramId = params.paramId

  if (!paramId) return <Parameters />

  const parameterPage = ParametersPageList.filter(
    (params) => params.id == paramId
  )

  if (parameterPage.length == 0) return notFound()

  const activeParameterPage = parameterPage[0]
  const data = await activeParameterPage.data()

  return (
    <div className="w-full flex gap-3 ">
      <NetsisSettingsForm
        id={activeParameterPage.id}
        title={activeParameterPage.name}
        columns={activeParameterPage.cols}
        data={data}
        prCols={activeParameterPage.prCols}
      />
    </div>
  )
}
export const dynamic = "force-dynamic"
export const revalidate = 5
const Parameters = () => {
  return (
    <>
      <ul className="flex flex-col">
        {ParametersPageList.map((parameterPage) => (
          <li key={parameterPage.id} className="m-2 border-b-2 p-2">
            <Link href={`/parameters/${parameterPage.id}`}>
              {parameterPage.name}
            </Link>
          </li>
        ))}
      </ul>
      {/*<ReportList />*/}
    </>
  )
}
export const metadata: Metadata = {
  title: {
    default: "Parameters",
    template: ``,
  },
  description: "",
}
