"use client";

import { Button } from "@/components/ui/button";
import { homeRoute } from "@/services/routes";
import config from "@/lib/config";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Headset, LayoutPanelLeft, Wifi } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-20 items-center justify-center h-[100vh] w-full">
      <div>
        <p className="text-4xl text-zinc-400">Oops!</p>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-2xl font-bold"> 404 </p>
        <Separator orientation="vertical" />
        <p className="text-sm">This page doesnot exsit.</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Wifi /> Check your connection.
        </div>
        <div className="flex items-center gap-2">
          <Headset /> Contact our support {config.site.supportEmail}
        </div>
        <div className="flex items-center gap-2">
          <LayoutPanelLeft /> <Link href={homeRoute}>Home</Link>
        </div>
      </div>
    </div>
  );
}
