import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  tags: ["autodocs"],
  title: "Components/NavBar",
  decorators: [
    (Story) => (
      <SessionProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </SessionProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
