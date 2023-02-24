import { ReactElement } from "react"
import { LABEL_POSITION } from "../constants"
export type IStep = {
    label: string,
    description?: string,
    status: string
}

export type IStepperProps = {
    steps: IStep[],
    currentStepIndex?: number,
    onStepClick?(step: IStep, stepIndex: number): void,
    renderBubble?(step: IStep, stepIndex: number): ReactElement,
    styles?: IStylesOverride,
    labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT
}

export type IStyleFunction = (step: IStep, stepIndex: number) => object

export type IStylesOverride = {
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
