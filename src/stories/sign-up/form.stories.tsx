import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SignUpForm from "@/components/sign-up/form";
import { SessionProvider } from "next-auth/react";

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  title: "Components/signup/form",
  decorators: [
    (Story) => (
      <div className="w-[100vw] items-center justify-center flex">
        <SessionProvider>
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        </SessionProvider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
