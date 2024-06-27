import type { Meta, StoryObj } from "@storybook/react";
import ProfileImage from "@/components/ProfileImage";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const meta: Meta<typeof ProfileImage> = {
  component: ProfileImage,
  tags: ["autodocs"],
  title: "Components/ProfileImage",
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
