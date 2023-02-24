import { ReactElement } from "react";
import { IStep, IStyleFunction } from "../stepper-component/types";

export type IBubbleProps = {
    step: IStep,
    renderAdornment?(step: IStep, index: number): ReactElement,
    index: number,
    currentStepIndex?: number,
    handleStepClick(): void,
    getBubbleStyles?: IStyleFunction,
    getActiveBubbleStyles?: IStyleFunction,
    getInActiveBubbleStyles?: IStyleFunction
}