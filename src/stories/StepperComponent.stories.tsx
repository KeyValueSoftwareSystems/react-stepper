import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stepper from '../stepper-component';

export default {
    title: 'Example/Stepper',
    component: Stepper,
    parameters: {
      // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  } as ComponentMeta<typeof Stepper>;


  const Template: ComponentStory<typeof Stepper> = (args) => <Stepper {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
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
  currentActiveStepIndex: 2,
  enableStepClick: true,
  // onStepClick: (stepIndex: number) => console.log("🚀 ~ file: StepperComponent.stories.tsx:37 ~ stepIndex", stepIndex)
  // renderAdornment: (step, index) => {}
};