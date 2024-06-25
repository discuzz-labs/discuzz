import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "Components/Spinner",
  decorators: [
    (Story) => (
      <Button variant="submit">
        <Story />
        Continue
      </Button>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
