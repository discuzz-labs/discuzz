import { ChevronsUpDown, Search, Square, Tag, Rss, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="w-1/4 self-start sticky h-10 top-16 p-2 flex gap-5 flex-col">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>

      <Collapsible>
        <div className="flex items-center justify-between px-4">
          <h2>Categories</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="py-2">
          <div className="pl-4">
            <p className="flex items-center gap-2">
              <Square className="fill-red-600 h-4 w-4" /> @radix-ui/colors
            </p>
          </div>
          <div className="pl-4">
            <p className="flex items-center gap-2">
              <Square className="fill-yellow-600 h-4 w-4" /> @stitches/react
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <div className="flex items-center justify-between px-4">
          <h2>Resources</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="py-2">
          <div className="pl-4">
            <p className="flex items-center gap-2">
              <Rss className="h-4 w-4" /> <Link href={""}>Website</Link>
            </p>
          </div>
          <div className="pl-4">
            <p className="flex items-center gap-2">
              <BookOpen  className="h-4 w-4" /> @stitches/react
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <div className="flex items-center justify-between px-4">
          <h2> Tags</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="py-2">
          <div className="pl-4">
            <p className="flex items-center gap-2">
              <Tag className="h-4 w-4" /> @radix-ui/colors
            </p>
          </div>
          <div className="pl-4">
            <p className="flex items-center gap-2">
              <Tag className="h-4 w-4" /> @stitches/react
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
