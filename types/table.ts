export type ReportColumnType = {
  key: string
  text: string
  type?: string
  filter?: boolean
  options?: { value: string | number; label: string }[]
}
