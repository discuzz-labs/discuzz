"use client";

import { Button } from "@/components/ui/button";
import MainLayoutStyle from "@/styles/MainLayoutStyle";
import ProfileImage from "@/components/ProfileImage";
import {
  BarChart2,
  CalendarDays,
  Link2,
  MessageCircle,
  Share,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Card } from "@/components/ui/card";

export default function UserLayout() {
  return (
    <MainLayoutStyle>
      <div className="relative flex flex-col w-full ">
        <div className="decorator h-[40vh]" />
        <div className="flex justify-end w-full px-5 py-2">
          <Button variant={"outline"}>Edit profile</Button>
        </div>
        <div className="absolute bottom-0 ml-5 w-32">
          <ProfileImage size={32} />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5">
        <div>
          <p className="text-2xl font-bold">Abdelrahman Shaheen</p>
          <p className="text-muted-foreground">email@email.com</p>
        </div>

        <div className="flex flex-col gap-5">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            repellendus doloribus ipsam asperiores, quis similique deleniti
            officiis recusandae voluptate adipisci, consectetur omnis, minus
            consequatur nemo libero modi molestias? Dolores, sequi
          </p>
          <div className="flex items-center gap-5">
            <p className="flex items-center text-muted-foreground text-sm gap-2">
              <CalendarDays className="h-4 w-4" /> Joind May 2024
            </p>
            <Link
              href="/"
              className="flex items-center text-blue-600 text-sm gap-2"
            >
              <Link2 className="h-4 w-4" /> solofox.vercel.app
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/followers">
              0{" "}
              <span className="hover:underline text-muted-foreground">
                Folllowers
              </span>
            </Link>
            <Link href="/following">
              11{" "}
              <span className="hover:underline text-muted-foreground">
                Following
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-accent bg-accent">Posts</MenubarTrigger>
          <MenubarTrigger className="hover:bg-accent">Replies</MenubarTrigger>
          <MenubarTrigger className="hover:bg-accent">Bookmarked</MenubarTrigger>
          <MenubarTrigger className="hover:bg-accent">Following</MenubarTrigger>
          <MenubarTrigger className="hover:bg-accent">Notifications</MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      <div className="px-5 pb-20">
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center gap-4">
            <ProfileImage size={10} />
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto hover:bg-destructive p-2 rounded-sm"> 
              <Trash2 className="w-4 h-4"/>
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              repellendus doloribus ipsam asperiores, quis similique deleniti
              officiis recusandae voluptate adipisci, consectetur omnis, minus
              consequatur nemo libero modi molestias? Dolores, sequi
            </p>
          </div>

          <div className="flex items-center w-full mt-5">
            <div className="flex-grow flex justify-evenly mr-20 items-center gap-5">
              <MessageCircle className="w-4 h-4" />
              <BarChart2 className="w-4 h-4" />
              <ThumbsUp className="w-4 h-4" />
              <ThumbsDown className="w-4 h-4" />
              <Share className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>
    </MainLayoutStyle>
  );
}
