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
    label: 'Jane Doe',
  }],
};