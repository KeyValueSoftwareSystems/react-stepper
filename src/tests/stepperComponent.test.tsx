import React from 'react';
import {
    render,
    fireEvent,
    queryByAttribute,
    queryAllByAttribute
} from "@testing-library/react";
import { IStep } from '../stepper-component/types';
import Stepper from "../stepper-component/stepperComponent";

const getById = queryByAttribute.bind(null, 'id');
const getAllById = queryAllByAttribute.bind(null, 'id');
test("Stepper Component - Label and description", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }]
    const dom = render(<Stepper steps={steps} />)
    const label = await getById(dom.container, "stepper-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "stepper-desc-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - No description", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        status: 'completed'
    }];
    const dom = render(<Stepper steps={steps} />)
    try {
        const val = await getById(dom.container, "stepper-desc-0");
        if (val === null) throw Error();
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
    const dom = render(<Stepper steps={steps} />);
    const elements = await getAllById(dom.container, "stepper-steps");
    expect(elements?.length).toBe(2);
})

test("Stepper Component - On Click function", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }];
    const onClick = jest.fn();
    const dom = render(
        <Stepper
            steps={steps}
            onStepClick={onClick}
        />
    )
    const bubble = await getById(dom.container, "stepper-bubble");
    fireEvent.click(bubble);
    expect(onClick).toBeCalled();
})