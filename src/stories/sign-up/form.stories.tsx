import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SignUpForm from "@/components/sign-up/form";

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  title: "Components/signup/form",
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
