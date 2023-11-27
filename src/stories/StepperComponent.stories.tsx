import React from "react";
import {
  ComponentStory,
  ComponentMeta,
} from "@storybook/react";
import Stepper from "../stepper";

export default {
  title: "Example/Stepper",
  component: Stepper,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Stepper>;

const Template: ComponentStory<typeof Stepper> = (props) => (
  <Stepper {...props} />
);

const steps = [
  {
    stepLabel: "Step 1",
    stepDescription: "The quick brown fox jumps over the lazy dog",
    completed: true,
  },
  {
    stepLabel: "Step 2",
    stepDescription: "The quick brown fox jumps over the lazy dog",
    completed: true,
  },
  {
    stepLabel: "Step 3",
    stepDescription: "The quick brown fox jumps over the lazy dog",
    completed: false,
  },
  {
    stepLabel: "Step 4",
    stepDescription: "The quick brown fox jumps over the lazy dog",
    completed: false,
  },
];

export const HorizontalStepperWithLabelOnLeft = Template.bind({});
HorizontalStepperWithLabelOnLeft.args = {
  orientation: "horizontal",
  labelPosition: "left",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};

export const HorizontalStepperWithLabelOnRight = Template.bind({});
HorizontalStepperWithLabelOnRight.args = {
  orientation: "horizontal",
  labelPosition: "right",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};

export const HorizontalStepperWithLabelOnTop = Template.bind({});
HorizontalStepperWithLabelOnTop.args = {
  orientation: "horizontal",
  labelPosition: "top",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
  stepContent: () => {
    return (<div style={{width: "100%", height: "400px", backgroundColor: "gray", display: "flex", justifyContent: "center", alignItems: "center"}}>Test</div>)
  }
};

export const HorizontalStepperWithLabelOnBottom = Template.bind({});
HorizontalStepperWithLabelOnBottom.args = {
  orientation: "horizontal",
  labelPosition: "bottom",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};

export const VerticalStepperWithLabelOnLeft = Template.bind({});
VerticalStepperWithLabelOnLeft.args = {
  orientation: "vertical",
  labelPosition: "left",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};

export const VerticalStepperWithLabelOnRight = Template.bind({});
VerticalStepperWithLabelOnRight.args = {
  orientation: "vertical",
  labelPosition: "right",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};

export const VerticalStepperWithLabelOnTop = Template.bind({});
VerticalStepperWithLabelOnTop.args = {
  orientation: "vertical",
  labelPosition: "top",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};

export const VerticalStepperWithLabelOnBottom = Template.bind({});
VerticalStepperWithLabelOnBottom.args = {
  orientation: "vertical",
  labelPosition: "bottom",
  currentStepIndex: 2,
  steps,
  showDescriptionsForAllSteps: false,
};
