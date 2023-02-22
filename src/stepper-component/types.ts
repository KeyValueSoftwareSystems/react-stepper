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

export interface IStylesOverride {
    getLabelDescriptionStyles?(step: IStep, index: number): object,
    getLabelTitleStyles?(step: IStep, index: number): object,
    getActiveLabelDescriptionStyles?(step: IStep, index: number): object,
    getActiveLabelTitleStyles?(step: IStep, index: number): object,
    getLineSeparatorStyles?(step: IStep, index: number): object,
    getInactiveLineSeparatorStyles?(step: IStep, index: number): object,
    getBubbleStyles?(step: IStep, index: number): object,
    getActiveBubbleStyles?(step: IStep, index: number): object,
    getInActiveBubbleStyles?(step: IStep, index: number): object,
}