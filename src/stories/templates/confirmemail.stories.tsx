import type { Meta, StoryObj } from "@storybook/react";
import ConfirmEmailTemplate from "@/email/confirmemail.email";

const meta: Meta<typeof ConfirmEmailTemplate> = {
  component: ConfirmEmailTemplate,
  title: "Email/confirmemail",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    otp: "1234",
  },
};
