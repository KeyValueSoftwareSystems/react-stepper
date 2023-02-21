import { ReactElement } from "react";
import { IStep } from "../stepper-component/types";

export interface IBubbleProps {
    step: IStep,
    enableStepClick: boolean,
    renderAdornment?(step: IStep, index: number): ReactElement,
    index: number,
    currentActiveStepIndexVal: number,
    handleStepClick(index: number): void
}