"use client";

import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { TABS } from "@/app/(user)/user/[userId]/routeType";
import { Bookmark, MessageSquare, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PostFilter from "./PostFilter";
import { TabTrigger } from "./TabTrigger";

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
        <TabTrigger
          onClick={() => handleTabChange("posts")}
          active={activeTab === TABS.POSTS || activeTab === TABS.EMPTY || activeTab === undefined}
          icon={<MessageSquare className="fill-zinc-600 text-zinc-600 h-4 w-4" />}
          label="Posts"
        />
        <TabTrigger
          onClick={() => handleTabChange("bookmarked")}
          active={activeTab === TABS.BOOKMARKED}
          icon={<Bookmark className="fill-blue-600 text-blue-600 h-4 w-4" />}
          label="Bookmarked"
        />
        <TabTrigger
          onClick={() => handleTabChange("following")}
          active={activeTab === TABS.FOLLOWING}
          icon={<Users2 className="fill-green-600 text-green-600 h-4 w-4" />}
          label="Following"
        />
        <PostFilter />
      </MenubarMenu>
    </Menubar>
  );
}
