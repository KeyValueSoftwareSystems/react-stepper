import { ReactElement } from "react"
import { LABEL_POSITION } from "../constants"
export interface IStep {
    label: string,
    description?: string,
    status: string
}

export interface IStepperProps {
    steps: IStep[],
    currentActiveStepIndex?: number,
    onStepClick?(stepIndex: number): void,
    enableStepClick?: boolean,
    renderAdornment?(step: IStep, index: number): ReactElement,
    stylesOverride?: IStylesOverride,
    labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT
}

export type IStyleFunction = (step: IStep, index: number) => object

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
