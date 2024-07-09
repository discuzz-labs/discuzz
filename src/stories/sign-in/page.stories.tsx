import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SignInPage from "@/components/sign-in/page";
import AuthProvider from "@/components/providers/AuthProvider";

const meta: Meta<typeof SignInPage> = {
  component: SignInPage,
  title: "Components/sign-in/page",
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
