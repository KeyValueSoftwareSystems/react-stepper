export interface Istep {
    label: string,
    description?: string
}

export interface IstepperProps {
    steps: Istep[],
    currentActiveStepIndex: number
}