import { ReactElement, CSSProperties } from "react";
import { Elements } from "../constants";
import type { IStep } from "../stepper/types";

export interface INodeProps {
  step: IStep;
  index: number;
  currentStepIndex: number;
  handleStepClick?: () => void;
  showCursor: boolean;
  renderNode?: (step: IStep, stepIndex: number) => ReactElement;
  getStyles: (element: Elements) => object;
  nodeStyle?: CSSProperties;
}
