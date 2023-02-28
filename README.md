
# React Vertical Stepper

<!--
<a href="https://www.npmjs.com/package/@hodgef/ts-library-boilerplate-basic"><img src="https://badgen.net/npm/v/@hodgef/ts-library-boilerplate-basic?color=blue" alt="npm version"></a> <a href="https://github.com/hodgef/ts-library-boilerplate"><img src="https://img.shields.io/github/last-commit/hodgef/ts-library-boilerplate" alt="latest commit"></a> <a href="https://github.com/hodgef/ts-library-boilerplate-basic/actions"><img alt="Build Status" src="https://github.com/hodgef/ts-library-boilerplate-basic/workflows/Build/badge.svg?color=green" /></a> <a href="https://github.com/hodgef/ts-library-boilerplate-basic/actions"> <img alt="Publish Status" src="https://github.com/hodgef/ts-library-boilerplate-basic/workflows/Publish/badge.svg?color=green" /></a> -->

>A fully customizable ready to use vertical stepper UI package.

## Installation

```
npm install react-vertical-stepper
```

You’ll need to install React separately since it isn't included in the package.

## Usage

React Vertical Stepper can run in a very basic mode by just providing the `steps` and `currentStepIndex` props like this:
```
import Stepper from 'react-vertical-stepper';

<Stepper
  steps={stepsArray}
  currentStepIndex={currentStepIndex}
/>
```
Here the steps array is an array of objects with basic keys like

-  `label` - a string that can be shown as step label title to your step indicator
-  `description` - a string that can be show as step description below the step label
-  `status` - can be provided with any of `visited`, `unvisited`, `completed`. Will be required if you are using default styles.

> You can also add other keys to the step object and other statuses like `skipped` for different customizations as per requirements

An example for steps array is shown below:

```
stepsArray = [
  {
    label: 'Step 1',
    description: 'This is Step 1',
    status: 'visited'
  },
  {
    label: 'Step 2',
    description: 'This is Step 2',
    status: 'unvisited'
  },
  {
    label: 'Step 3',
    description: 'This is Step 3',
    status: 'completed'
  }
];
```
You can use `onStepClick` event handler which fires each time you click on a step or its label or description
```
const [activeStepIndex, setActiveStepIndex] = useState(0);

const handleStepClick = (step, stepIndex) => {
  setActiveStepIndex(stepIndex);
};

<Stepper
  steps={stepsArray}
  currentStepIndex={activeStepIndex}
  onStepClick={handleStepClick}
/>
```
You can also customize the step indicator bubble with your own DOM element using the `renderBubble` prop
```
<Stepper
  steps={stepsArray}
  currentStepIndex={currentStepIndex}
  renderBubble={(step, stepIndex) => (<div key={stepIndex}>{step.label}</div>)}
/>
```

>Note: The `step` param provided by the `renderBubble` callback is the same object you pass as array item in `steps` prop.

## Props

Props that can be passed to the component are listed below:

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><b>steps:</b> object[]</code></td>
      <td>
        An array of step objects to render.
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>currentIndex:</b> number</code></td>
      <td>
        The index of current active step.
      </td>
      <td>0</td>
    </tr>
    <tr>
      <td><code><b>onStepClick?:</b> (step: object, stepIndex: number): void</code></td>
      <td>
        A step click handler that fires each time you click on a step, its label or its description.
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>renderBubble?:</b> (step: object, stepIndex: number): ReactElement</code></td>
      <td>
        A render function to customize your step indicator with your own element.
      </td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>labelPosition?:</b> 'left' | 'right'</code></td>
      <td>
        Allows you to align step label and description to either <code>left</code> or <code>right</code> of step indicator
      </td>
      <td><code>right</code></td>
    </tr>
    <tr>
      <td><code><b>styles?:</b> object</code></td>
      <td>
        Provides you with a bunch of callback functions to override the default styles.
      </td>
      <td><code>undefined</code></td>
    </tr>
  </tbody>
</table>

## Style Customizations

All the default styles provided by this package are overridable using the `style` prop.
the below code shows all the overridable styles:
```
<Stepper
  steps={stepsArray}
  currentStepIndex={currentStepIndex}
  styles={{
    LabelTitle: (step, stepIndex) => ({...styles}),
    ActiveLabelTitle: (step, stepIndex) => ({...styles}),
    LabelDescription: (step, stepIndex) => ({...styles}),
    ActiveLabelDescription: (step, stepIndex) => ({...styles}),
    LineSeparator: (step, stepIndex) => ({...styles}),
    InactiveLineSeparator: (step, stepIndex) => ({...styles}),
    Bubble: (step, stepIndex) => ({...styles}),
    ActiveBubble: (step, stepIndex) => ({...styles}),
    InActiveBubble: (step, stepIndex) => ({...styles}),
  }}
/>
```

> All the `getXXStyles` functions can be passed optionally using `styles` prop and can be used to override specific css styles to the respective elements.

-  `LabelTitle` - overrides the step label style
-  `ActiveLabelTitle` - overrides the step label style of current active step
-  `LabelDescription` - overrides the step description style
-  `ActiveLabelDescription` - overrides the step description style of current active step
-  `LineSeparator` - overrides default step connector line styles
-  `InactiveLineSeparator` - overrides styles of step connector line after current active step
-  `Bubble` - overrides default styles of step indicator
-  `ActiveBubble` - overrides default styles of step indicator of current active step
-  `InActiveBubble` - overrides default styles of step indicator that has `unvisited` step status