
# React Stepper
<a href="https://www.npmjs.com/package/@keyvaluesystems/react-vertical-stepper"><img src="https://badgen.net/npm/v/@keyvaluesystems/react-vertical-stepper?color=blue" alt="npm version"></a> <a href="https://www.npmjs.com/package/@keyvaluesystems/react-vertical-stepper" ><img src="https://img.shields.io/npm/dw/@keyvaluesystems/react-vertical-stepper?label=Downloads" /></a> <a href="https://github.com/KeyValueSoftwareSystems/react-vertical-stepper"><img src="https://github.com/KeyValueSoftwareSystems/react-vertical-stepper/actions/workflows/update-and-publish.yml/badge.svg" alt="" /></a>

<div align="center">
<img src="./src/assets/stepper-example.png" alt="" width="269" height="416"/>
</div>

A fully customizable ready to use stepper UI package for React.
Try tweaking a stepper using this codesandbox link <a href="https://codesandbox.io/p/sandbox/react-stepper-zp2jrs?file=%2Fsrc%2FApp.js" >here</a>

## Installation

The easiest way to use react-stepper-ui-component is to install it from npm and build it into your app with Webpack.

```bash
npm install  @keyvaluesystems/react-stepper
```

You’ll need to install React separately since it isn't included in the package.

## Usage

React Stepper can run in a very basic mode by just providing the `steps` and `currentStepIndex` props like this:

```jsx
import  React,  {  useState  }  from  'react';
import Stepper from 'react-vertical-stepper';

function  App()  {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  
  stepsArray = [{
      label: 'Step 1',
      description: 'This is Step 1',
      completed: true,
    },{
      label: 'Step 2',
      description: 'This is Step 2',
      completed: false,
    },{
      label: 'Step 3',
      description: 'This is Step 3',
      completed: false,
  }];

  return (
    <Stepper
      steps={stepsArray}
      currentStepIndex={currentStepIndex}
    />
  );
}

export default App;
```
The `steps` array is an array of objects with basic keys like

-  `label` - A mandatory string representing the label or title of the step.
-  `description` - An optional string providing additional information or description for the step.
-  `completed` - A boolean indicating whether the step has been completed.

You can customize the step indicator bubble with your own DOM element using the `renderBubble` prop

```jsx
<Stepper
  steps={stepsArray}
  currentStepIndex={currentStepIndex}
  renderBubble={(step, stepIndex) => (<div key={stepIndex}>{step.label}</div>)}
/>
```
The `step` param provided by the `renderBubble` callback is the same object you pass as array item in `steps` prop.

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
      <td>An array of step objects to render.</td>
      <td><code>undefined</code></td>
    </tr>
    <tr>
      <td><code><b>currentStepIndex:</b> number</code></td>
      <td>The index of current active step.</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code><b>onStepClick?:</b> (step: object, stepIndex: number): void</code></td>
      <td>
        A step click handler that fires each time you click on a step.
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
      <td><code><b>orientation?:</b> 'horizontal' | 'vertical'</code></td>
      <td>
        Determines the layout of the stepper, accepting either "horizontal" or "vertical" as values to configure it as either a horizontal or vertical stepper.
      </td>
      <td><code>vertical</code></td>
    </tr>
    <tr>
      <td><code><b>labelPosition?:</b> 'left' | 'right' | 'top' | 'bottom'</code></td>
      <td>
        Allows you to align step label and description to <code>left</code> , <code>right</code>, <code>top</code> or <code>bottom</code> of step indicator
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

All the default styles provided by this package can be overridden using the `style` prop
the below code shows all the styles that can be overridden:

```jsx
import React from 'react';
import Stepper from 'react-vertical-stepper';

function App() {

 const stylesOverride = {
   LabelTitle: (step, stepIndex) => ({...styles}),
   ActiveLabelTitle: (step, stepIndex) => ({...styles}),
   LabelDescription: (step, stepIndex) => ({...styles}),
   ActiveLabelDescription: (step, stepIndex) => ({...styles}),
   LineSeparator: (step, stepIndex) => ({...styles}),
   InactiveLineSeparator: (step, stepIndex) => ({...styles}),
   Bubble: (step, stepIndex) => ({...styles}),
   ActiveBubble: (step, stepIndex) => ({...styles}),
   InActiveBubble: (step, stepIndex) => ({...styles}),
 };
 return (
   <Stepper
     steps={stepsArray}
	  currentStepIndex={currentStepIndex}
	  styles={stylesOverride}
   />
 );
}

export default App;
```
  
-  `LabelTitle` - overrides the step label style
-  `ActiveLabelTitle` - overrides the step label style of current active step
-  `LabelDescription` - overrides the step description style
-  `ActiveLabelDescription` - overrides the step description style of current active step
-  `LineSeparator` - overrides default step connector line styles
-  `InactiveLineSeparator` - overrides styles of step connector line after current active step
-  `Bubble` - overrides default styles of step indicator
-  `ActiveBubble` - overrides default styles of step indicator of current active step
-  `InActiveBubble` - overrides default styles of step indicator that is not completed and not active