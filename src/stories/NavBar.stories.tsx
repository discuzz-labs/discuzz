import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/providers/theme-provider";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  tags: ["autodocs"],
  title: "Components/NavBar",
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
