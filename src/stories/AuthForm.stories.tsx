import type { Meta, StoryObj } from "@storybook/react";
import AuthForm from "@/components/AuthForm";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SignInFormSchema } from "@/validations/validation";

const meta: Meta<typeof AuthForm> = {
  component: AuthForm,
  tags: ["autodocs"],
  title: "Components/AuthForm",
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
   schema: SignInFormSchema,
   formSubmitted: false,
   callbackFn: () => {},
   fields: [
     {
       name: "email",
       type: "email",
       placeholder: "Email",
     },
     {
       name: "password",
       type: "password",
       placeholder: "Password",
     },
   ]
  },
};
