import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Stepper from "../stepper";
import { IStep } from "../stepper/types";
import { ORIENTATION } from "../constants";

export default {
  title: "Example/Stepper",
  component: Stepper,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Stepper>;

type Story = StoryObj<typeof Stepper>;

export const VerticalStepper: Story = {
  render: () => (
    <Stepper
      orientation="horizontal"
      textPos="right"
      completedStep={1}
      currentStep={2}
      steps={[
        {
          label: "Step 1",
          description: "The quick brown fox jumps over the lazy dog",
          status: "",
        },
        {
          label: "Step 2",
          description: "The quick brown fox jumps over the lazy dog",
          status: "",
        },
        {
          label: "Step 3",
          description: "The quick brown fox jumps over the lazy dog",
          status: "",
        },
        {
          label: "Step 4",
          description: "The quick brown fox jumps over the lazy dog",
          status: "",
        },
      ]}
      currentStepIndex={1}
    />
  ),
};
