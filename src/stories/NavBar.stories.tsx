import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  tags: ["autodocs"],
  title: "Components/NavBar",
  decorators: [
    (Story) => (
      <ClerkProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </ClerkProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
