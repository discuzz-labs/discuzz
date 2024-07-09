import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  tags: ["autodocs"],
  title: "Components/NavBar",
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
  args: {},
};
