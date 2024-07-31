"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { TABS } from "@/app/(user)/user/[userId]/routeType";
import { Bookmark, MessageSquare, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PostFilter from "./PostFilter";

interface DashboardMenuProps {
  activeTab: keyof typeof TABS;
}

export default function DashboardMenu({ activeTab }: DashboardMenuProps) {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("tab", tab);
    router.push(`?${queryParams.toString()}`, { scroll: false });
  };

  return (
    <Menubar className="mt-10">
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => handleTabChange("posts")}
          className={`flex items-center gap-2 hover:bg-accent hover:text-accent-foreground ${
            activeTab === TABS.POSTS ||
            activeTab === TABS.EMPTY ||
            activeTab === undefined
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <MessageSquare className="fill-zinc-600 text-zinc-600 h-4 w-4" />{" "}
          Posts
        </MenubarTrigger>
        <MenubarTrigger
          onClick={() => handleTabChange("bookmarked")}
          className={`flex items-center gap-2 hover:bg-accent hover:text-accent-foreground ${
            activeTab === TABS.BOOKMARKED
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Bookmark className="fill-blue-600 text-blue-600 h-4 w-4" />{" "}
          Bookmarked
        </MenubarTrigger>
        <MenubarTrigger
          onClick={() => handleTabChange("following")}
          className={`flex items-center gap-2 hover:bg-accent hover:text-accent-foreground ${
            activeTab === TABS.FOLLOWING
              ? "bg-primary text-primary-foreground"
              : ""
          }`}
        >
          <Users2 className="fill-green-600 text-green-600 h-4 w-4" /> Following
        </MenubarTrigger>
        <PostFilter />
      </MenubarMenu>
    </Menubar>
  );
}
