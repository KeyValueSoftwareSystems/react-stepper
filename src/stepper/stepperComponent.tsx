import React from "react";
import "./styles.scss";
import type { IStepperProps } from "./types";
import { ORIENTATION } from "../constants";
import Step from "./step";

const Stepper = (props: IStepperProps): JSX.Element => {
  const {
    steps,
    currentStepIndex = 0,
    orientation = ORIENTATION.VERTICAL,
    stepContent
  } = props;

  const isVertical = orientation === ORIENTATION.VERTICAL;

  return (
    <>
      <ul
        className={`stepper ${
          isVertical ? "verticalStepper" : "horizontalStepper"
        }`}
      >
        {steps.map((step, index) => <Step key={`${step.stepLabel}-${step.stepDescription}`} stepperProps={props} step={step} index={index} />)}
      </ul>
      {!isVertical && // For horizontal stepper, the content is displayed below the stepper with full width
        stepContent &&
        stepContent(steps[currentStepIndex], currentStepIndex)}
    </>
  );
};

export default Stepper;
