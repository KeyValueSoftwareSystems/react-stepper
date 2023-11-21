import { ReactElement } from "react";
import { LABEL_POSITION, ORIENTATION } from "../constants";
import { Elements } from "../constants";

export type IStep = {
  label: string;
  description?: string;
  status: string;
};

export type IStepperProps = {
  steps: IStep[];
  currentStepIndex?: number;
  orientation?: ORIENTATION.HORIZONTAL | ORIENTATION.VERTICAL;
  styles?: { [key in Elements]: IStyleFunction };
  labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT | LABEL_POSITION.TOP | LABEL_POSITION.BOTTOM;
  showAllDescriptions?: boolean;
  renderContent?(step: IStep, stepIndex: number): ReactElement; 
  onStepClick?(step: IStep, stepIndex: number): void;
  renderBubble?(step: IStep, stepIndex: number): ReactElement;
};

export type IStyleFunction = (step: IStep, stepIndex: number) => object;
