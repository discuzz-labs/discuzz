"use client";

import MainLayoutStyle from "@/styles/MainLayoutStyle";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Image from "next/image";
import { Link, MessageSquareQuote, ThumbsUp, MessageSquare, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardLayout() {
  return (
    <MainLayoutStyle>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-extrabold">Dashboard</p>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Overview</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Posts</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Followers</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Following</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Bookmarked Posts</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>


      <div className="rounded-md flex gap-5 items-center border border-input p-2">
        <Image
          src="https://www.gravatar.com/avatar/placeholder"
          width={0}
          height={0}
          alt="Profile Image"
          className="w-20 rounded-full "
          priority
          unoptimized
          unselectable="off"
          />
        <div className="flex gap-2 flex-col">
          <p className="font-medium leading-snug text-pretty text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            fugiat beatae quibusdam sit impedit dolores velit odio ratione,
            obcaecati earum, quisquam asperiores mollitia optio qui iste harum
            sunt, voluptatem deserunt!
          </p>
          <div className="flex items-center gap-2">
            <Badge
              className="cursor-pointer gap-2 text-sm max-w-36"
              variant="secondary"
            >
              <Link size={20} /> Github
            </Badge>
            <Badge
              className="cursor-pointer gap-2 text-sm max-w-36"
              variant="secondary"
            >
              <Link size={20} /> Twitter
            </Badge>
            <Badge
              className="cursor-pointer gap-2 text-sm max-w-36"
              variant="secondary"
              >
              <Link size={20} /> Facebook
            </Badge>
          </div>
        </div>
      </div>
              <div className="grid grid-cols-3 gap-5"> 
                <Card>
                  <CardHeader>
                    <p>Posts</p>
                    <MessageSquare size="20"/>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate font-bold text-2xl">+ 123</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <p>Followers</p>
                    <UsersRound size="20"/>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate font-bold text-xl">+ 123</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <p>Likes</p>
                    <ThumbsUp size={20}/>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate font-bold text-xl">+ 123</p>
                  </CardContent>
                </Card>
              </div>

      <div className="grid gap-5 grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <p>Overview</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                    />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
          <CardHeader>
              <CardTitle>
                <p>Recent Posts</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {[0,1,2].map((i) => (<div key={i} className="flex flex-col border-b cursor-pointer p-2 gap-2 hover:bg-muted rounded-sm justify-center">
                <p className="truncate">
                  How can i import firefox data to arc?
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="gap-2">
                    <Eye /> +10
                  </Badge>
                  <Badge className="gap-2">
                    <MessageSquareQuote /> +10
                  </Badge>
                </div>
              </div>
            ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayoutStyle>
  );
}
