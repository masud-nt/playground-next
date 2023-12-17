import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../src/components/Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    className: {
      control: "none",
      description: "Apply className to style Skeleton",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-16 w-16 rounded-full" {...args} />
      <div className="space-y-4">
        <Skeleton className="h-3.5 w-72" {...args} />
        <Skeleton className="h-3.5 w-72" {...args} />
      </div>
    </div>
  ),
};
