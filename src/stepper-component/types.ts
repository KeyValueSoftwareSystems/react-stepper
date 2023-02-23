import { ReactElement } from "react"
import { LABEL_POSITION } from "../constants"
export interface IStep {
    label: string,
    description?: string,
    status: string
}

export interface IStepperProps {
    steps: IStep[],
    currentStepIndex?: number,
    onStepClick?(step: IStep, stepIndex: number): void,
    renderBubble?(step: IStep, stepIndex: number): ReactElement,
    styles?: IStylesOverride,
    labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT
}

export type IStyleFunction = (step: IStep, stepIndex: number) => object

export interface IStylesOverride {
    getLabelDescriptionStyles?: IStyleFunction,
    getLabelTitleStyles?: IStyleFunction,
    getActiveLabelDescriptionStyles?: IStyleFunction,
    getActiveLabelTitleStyles?: IStyleFunction,
    getLineSeparatorStyles?: IStyleFunction,
    getInactiveLineSeparatorStyles?: IStyleFunction,
    getBubbleStyles?: IStyleFunction,
    getActiveBubbleStyles?: IStyleFunction,
    getInActiveBubbleStyles?: IStyleFunction,
}
