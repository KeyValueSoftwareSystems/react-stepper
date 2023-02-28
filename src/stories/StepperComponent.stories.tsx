import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stepper from '../stepper-component';
import { IStep } from '../stepper-component/types';

export default {
    title: 'Example/Stepper',
    component: Stepper,
    parameters: {
      // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  } as ComponentMeta<typeof Stepper>;


  const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args} />;

export const VerticalStepper = Template.bind({});
VerticalStepper.args = {
  steps: [{
    label: 'Step 1',
    description: 'The quick brown fox jumps over the lazy dog'
  },
  {
    label: 'Step 2',
    description: 'The quick brown fox jumps over the lazy dog'
  },
  {
    label: 'Step 3',
    description: 'The quick brown fox jumps over the lazy dog'
  },
  {
    label: 'Step 4',
    description: 'The quick brown fox jumps over the lazy dog'
  }],
  currentStepIndex: 2,
  // onStepClick: (stepIndex: number) => console.log("🚀 ~ file: StepperComponent.stories.tsx:37 ~ stepIndex", stepIndex)
  // renderBubble: (step, index) => (<></>),
  // labelPosition: 'right',
  // styles: {
  //   Bubble: () => ({ background: 'yellow'}),
  //   LineSeparator: (step: IStep, index: number) => (index === 2 ? { borderRight: '1px solid red' } : {}),
  //   InactiveLineSeparator: (step: IStep, index: number) => (index === 2 ? { borderRight: '1px dashed red' } : {}),
  //   LabelTitle: () => ({ background: 'red'}),
  //   ActiveLabelTitle: () => ({ background: 'green'}),
  //   LabelDescription: () => ({ background: 'red'}),
  //   ActiveLabelDescription: () => ({ background: 'green'}),
  //   ActiveBubble: () => ({ background: 'orange'}),
  //   InActiveBubble: () => ({ background: 'grey'})
  // }
};