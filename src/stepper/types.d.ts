import { ReactElement } from "react";
import { LABEL_POSITION } from "../constants";
import { Elements } from "../constants";

export type IStep = {
  label: string;
  description?: string;
  status: string;
};

type Orientation = "horizontal" | "vertical";

// export type IStepperProps = {
//   steps: IStep[];
//   currentStepIndex?: number;
//   orientation?: Orientation;
//   onStepClick?(step: IStep, stepIndex: number): void;
//   renderBubble?(step: IStep, stepIndex: number): ReactElement;
//   styles?: { [key in Elements]: IStyleFunction };
//   labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT;
// };

export type Stepper = {
  orientation?: Orientation;
  steps: IStep[];
  currentStep: number;
  completedStep: number;
  disableNavigation?: boolean;
  onStepClick?(step: IStep, stepIndex: number): void;
};

export type IStyleFunction = (step: IStep, stepIndex: number) => object;
