import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ReactNode } from "react";
import Spinner from "@/components/Spinner";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  title: "Components/ui/Button",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Submit: Story = {
  args: {
    variant: "submit",
    size: "default",
    onClick: () => console.log("Clicked"),
    children: [<Spinner />, "Submitted"],
  },
};

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
    size: "default",
    onClick: () => console.log("Clicked"),
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    children: "Ghost",
    onClick: () => console.log("Clicked"),
  },
};

export const Disabeld: Story = {
  args: {
    variant: "default",
    disabled: true,
    size: "default",
    children: "Disabeld",
    onClick: () => console.log("Clicked"),
  },
};
