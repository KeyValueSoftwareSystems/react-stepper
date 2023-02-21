import { ReactElement } from "react"

export interface IStep {
    label: string,
    description?: string,
    status: string
}

export interface IStepperProps {
    steps: IStep[],
    currentActiveStepIndex: number,
    onStepClick?(stepIndex: number): void,
    enableStepClick?: boolean,
    renderAdornment?(step: IStep, index: number): ReactElement
}