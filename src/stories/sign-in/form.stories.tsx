import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SignInForm from "@/components/sign-in/form";

const meta: Meta<typeof SignInForm> = {
  component: SignInForm,
  title: "Components/signIn/form",
  decorators: [
    (Story) => (
      <div className="w-[100vw] items-center justify-center flex">
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
