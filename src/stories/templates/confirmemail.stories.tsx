import type { Meta, StoryObj } from "@storybook/react";
import ConfirmEmailTemplate from "@/templates/confirmemail.email";

const meta: Meta<typeof ConfirmEmailTemplate> = {
  component: ConfirmEmailTemplate,
  title: "Templates/email/confirmemail",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    otp: "1234"
  },
};
