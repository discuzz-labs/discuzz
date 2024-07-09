import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SignUpPage from "@/components/sign-up/page";
import AuthProvider from "@/components/providers/AuthProvider";

const meta: Meta<typeof SignUpPage> = {
  component: SignUpPage,
  title: "Components/sign-up/page",
  decorators: [
    (Story) => (
      <div className="w-[100vw] items-center justify-center flex">
        <AuthProvider>
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        </AuthProvider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
