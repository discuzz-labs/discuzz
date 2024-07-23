"use client"

import { Button } from "@/components/ui/button"
import {homeRoute} from "@/services/routes"
import config from "@/lib/config"
import Link from "next/link"

export default function Error() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-[100vh] w-full">
      <p className='font-thin text-zinc-500 text-7xl tracking-[-6.5px] '>What?</p>
      <p>500 : there was an error on our server. Try again later.</p>
      <p>Contact our support: {config.site.supportEmail}</p>
      <Button variant={"ghost"} className="lg:w-1/3 w-2/3">
        <Link href={homeRoute}>Home</Link>
      </Button>
    </div>
  )
}
