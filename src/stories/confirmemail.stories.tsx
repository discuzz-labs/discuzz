import type { Meta, StoryObj } from "@storybook/react";
import VerificationEmailTemplate from "@/emailTemplate/VerificationEmail";

const meta: Meta<typeof VerificationEmailTemplate> = {
  component: VerificationEmailTemplate,
  title: "emailtemplate/Verificationemail",
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
