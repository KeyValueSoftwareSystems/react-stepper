import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { IStep } from '../stepper-component/types';
import Stepper from "../stepper-component/stepperComponent";

test("Stepper Component - Label and description", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }]
    const {findByTestId} = render(<Stepper steps={steps} />)
    const label = await findByTestId("stepper-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await findByTestId("stepper-desc-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - No description", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        status: 'completed'
    }];
    const {findByTestId} = render(<Stepper steps={steps} />)
    try {
        await findByTestId("stepper-desc-0");
    } catch (err){
        return;
    }
    throw Error("Description found");
})

test("Stepper Component - Number of steps", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        status: 'completed'
    },{
        label: 'Step 2',
        status: 'visited'
    }];
    const {findAllByTestId} = render(<Stepper steps={steps} />);
    const elements = await findAllByTestId("stepper-steps");
    expect(elements?.length).toBe(2);
})

test("Stepper Component - On Click function without config", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }];
    const onClick = jest.fn();
    const {findByTestId} = render(<Stepper steps={steps} onStepClick={onClick} />)
    const bubble = await findByTestId("stepper-bubble");
    fireEvent.click(bubble);
    expect(onClick).not.toBeCalled();
})

test("Stepper Component - On Click function with config", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }];
    const onClick = jest.fn();
    const {findByTestId} = render(
        <Stepper
            steps={steps}
            onStepClick={onClick}
            enableStepClick={true}
        />
    )
    const bubble = await findByTestId("stepper-bubble");
    fireEvent.click(bubble);
    expect(onClick).toBeCalled();
})