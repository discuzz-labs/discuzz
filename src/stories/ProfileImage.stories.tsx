import type { Meta, StoryObj } from "@storybook/react";
import ProfileImage from "@/components/ProfileImage";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const meta: Meta<typeof ProfileImage> = {
  component: ProfileImage,
  tags: ["autodocs"],
  title: "Components/ProfileImage",
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