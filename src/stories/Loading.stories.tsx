import type { Meta, StoryObj } from "@storybook/react";
import Loading from "@/components/Loading";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const meta: Meta<typeof Loading> = {
  component: Loading,
  tags: ["autodocs"],
  title: "Components/Loading",
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

export const Default: Story = {};
