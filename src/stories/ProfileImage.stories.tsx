import type { Meta, StoryObj } from "@storybook/react";
import ProfileImage from "@/components/ProfileImage";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/AuthProvider";

const meta: Meta<typeof ProfileImage> = {
  component: ProfileImage,
  tags: ["autodocs"],
  title: "Components/ProfileImage",
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
