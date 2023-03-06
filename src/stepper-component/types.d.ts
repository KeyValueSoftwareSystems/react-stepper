import { ReactElement } from "react"
import { LABEL_POSITION } from "../constants"
import { Elements } from "../constants"

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
    styles?: { [key in Elements]: IStyleFunction },
    labelPosition?: LABEL_POSITION.LEFT | LABEL_POSITION.RIGHT
}

export type IStyleFunction = (step: IStep, stepIndex: number) => object
