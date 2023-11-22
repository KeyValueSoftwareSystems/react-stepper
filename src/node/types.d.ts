import { ReactElement } from "react";
import { IStep } from "../stepper/types";
import { Elements } from "../constants";

export type INodeProps = {
  step: IStep;
  renderNode?(step: IStep, index: number): ReactElement;
  index: number;
  currentStepIndex?: number;
  handleStepClick(): void;
  showCursor: boolean;
  getStyles(element: Elements): object;
};
