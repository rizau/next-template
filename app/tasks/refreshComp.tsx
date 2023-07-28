"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function RefreshComp() {
  const router = useRouter()

  const refresh = () => {
    router.refresh()
  }
  return <Button onClick={refresh}>yenile</Button>
}
