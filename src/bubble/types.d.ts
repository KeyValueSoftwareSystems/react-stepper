import { ReactElement } from "react";
import { IStep } from "../stepper-component/types";

export interface IBubbleProps {
    step: IStep,
    renderAdornment?(step: IStep, index: number): ReactElement,
    index: number,
    currentStepIndex?: number,
    handleStepClick(): void,
    getBubbleStyles?(step: IStep, index: number): object,
    getActiveBubbleStyles?(step: IStep, index: number): object,
    getInActiveBubbleStyles?(step: IStep, index: number): object,
}