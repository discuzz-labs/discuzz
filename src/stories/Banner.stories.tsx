import type { Meta, StoryObj } from "@storybook/react";
import Banner from "@/components/dashbaord/Banner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

const meta: Meta<typeof Banner> = {
  component: Banner,
  tags: ["autodocs"],
  title: "Components/Banner",
  decorators: [
    (Story) => (
      <AuthProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </AuthProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Test User",
  },
};
