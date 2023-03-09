import { ReactElement } from "react";
import { IStep } from "../stepper-component/types";
import { Elements } from "../constants";

export type IBubbleProps = {
  step: IStep,
  renderAdornment?(step: IStep, index: number): ReactElement,
  index: number,
  currentStepIndex?: number,
  handleStepClick(): void,
  showCursor: boolean,
  getStyles(element: Elements): object,
  labelPosition: 'left' | 'right'
}