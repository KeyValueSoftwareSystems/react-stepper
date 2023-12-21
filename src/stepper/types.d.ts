import { LegacyRef, ReactElement } from "react";
import { LABEL_POSITION, ORIENTATION } from "../constants";
import { Elements } from "../constants";

export type IStep = {
  stepLabel: string;
  stepDescription?: string;
  completed?: boolean;
};

export type IStepperProps = {
  steps: IStep[];
  currentStepIndex?: number;
  orientation?: ORIENTATION.HORIZONTAL | ORIENTATION.VERTICAL;
  styles?: { [key in Elements]?: IStyleFunction };
  labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT | LABEL_POSITION.TOP | LABEL_POSITION.BOTTOM;
  showDescriptionsForAllSteps?: boolean;
  stepContent?(step: IStep, stepIndex: number): ReactElement; 
  onStepClick?(step: IStep, stepIndex: number): void;
  renderNode?(step: IStep, stepIndex: number): ReactElement;
};

export type IStyleFunction = (step: IStep, stepIndex: number) => object;

export type IStepProps = {
  stepperProps: IStepperProps;
  step: IStep;
  index: number;
}

export type IStepInfoProps = {
  orientation: ORIENTATION.HORIZONTAL | ORIENTATION.VERTICAL;
  labelPosition:LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT | LABEL_POSITION.TOP | LABEL_POSITION.BOTTOM;
  isVertical: boolean;
  isInlineLabelsAndSteps: boolean;
  index: number;
  currentStepIndex: number;
  step: IStep;
  showDescriptionsForAllSteps: boolean;
  onStepClick?(step: IStep, stepIndex: number): void; 
  renderNode?(step: IStep, stepIndex: number): ReactElement;
  styles: { [key in Elements]?: IStyleFunction };
  nodeRef: LegacyRef<HTMLDivElement> | undefined
  prevConnectorClassName: string;
  nextConnectorClassName: string;
  steps: IStep[];
}

export type IStepContentProps = {
  labelPosition: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT | LABEL_POSITION.TOP | LABEL_POSITION.BOTTOM;
  isVertical: boolean;
  currentStepIndex: number;
  index: number;
  styles: { [key in Elements]?: IStyleFunction };
  step: IStep
  showDescriptionsForAllSteps: boolean;
  middleConnectorClassName: string;
  stepContent?(step: IStep, stepIndex: number): ReactElement;
  nodeWidth: number;
}
