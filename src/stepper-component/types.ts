export interface Istep {
    label: string,
    description?: string,
    status: string
}

export interface IstepperProps {
    steps: Istep[],
    currentActiveStepIndex: number,
    onStepClick?(stepIndex: number): void,
    enableStepClick: boolean
}