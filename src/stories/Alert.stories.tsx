import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@/components/Alert";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ["autodocs"],
  title: "Components/Alert",
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
  args: {
    message: "This is an info alert.",
    type: "info",
  },
};
export const Error: Story = {
  args: {
    message: "This is an error alert.",
    type: "error",
  },
};
export const Warning: Story = {
  args: {
    message: "This is a warning alert.",
    type: "warning",
  },
};
