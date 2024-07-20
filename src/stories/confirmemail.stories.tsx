import type { Meta, StoryObj } from "@storybook/react";
import ConfirmEmailTemplate from "@/emailTemplate/confirmemail.email";

const meta: Meta<typeof ConfirmEmailTemplate> = {
  component: ConfirmEmailTemplate,
  title: "emailtemplate/confirmemail",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    otp: "123456",
    userName: "Test User"
  },
};
