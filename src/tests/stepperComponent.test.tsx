import React from 'react';
import {
    render,
    fireEvent,
    queryByAttribute,
    queryAllByAttribute,
    screen
} from "@testing-library/react";
import { IStep } from '../stepper/types';
import Stepper from "../stepper/stepperComponent";
import { LABEL_POSITION, ORIENTATION } from '../constants';

const getById = queryByAttribute.bind(null, 'id');
const getAllById = queryAllByAttribute.bind(null, 'id');

test("Stepper Component - Label and description", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }]
    const dom = render(<Stepper steps={steps}  />)
    const label = await getById(dom.container, "step-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-description-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - No description", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        status: 'completed'
    }];
    const dom = render(<Stepper steps={steps} />)
    try {
        const val = await getById(dom.container, "step-description-0");
        if (val === null) {
            throw Error("Description found");
        }
    } catch (err){
        return;
    }
})

test("Stepper Component - with multiple steps and currentStepIndex passed", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: "Step 1 description",
        status: 'completed'
    },{
        label: 'Step 2',
        description: "Step 2 description",
        status: 'visited'
    },
    {
        label: 'Step 3',
        description: "Step 3 description",
        status: 'unvisited'
    }];
    const dom = render(<Stepper steps={steps} />);
    const elements = await getAllById(dom.container, "stepper-step");
    expect(elements?.length).toBe(3);
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

test("Stepper Component - customized bubble", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }];
    const renderBubble = jest.fn();
    const dom = render(
        <Stepper
            steps={steps}
            renderBubble={renderBubble}
        />
    )
    const bubble = await getById(dom.container, "stepper-bubble");
    fireEvent.click(bubble);
    expect(renderBubble).toBeCalled();
})

test("Stepper Component - custom style", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description 1',
        status: 'completed'
    },
    {
        label: 'Step 2',
        description: 'Demo description 2',
        status: 'visited'
    },
    {
        label: 'Step 1',
        description: 'Demo description 3',
        status: 'unvisited'
    }];
    const styles = {
        LineSeparator: () => ({
            minHeight: "20px"
        }),
        InactiveLineSeparator: () => ({
            backgroundColor: "black",
        }),
        LabelDescription: () => ({
            color: "black",
        }),
        LabelTitle: () => ({
            color: "black",
        }),
        ActiveLabelTitle: () => ({
            color: "blue",
        }),
        ActiveLabelDescription: () => ({
            color: "red",
        }),
        Bubble: () => ({
            backgroundColor: "red",
        }),
        ActiveBubble: () => ({
            backgroundColor: "blue",
        }),
        InActiveBubble: () => ({
            backgroundColor: "black",
        }),
    }
    const renderBubble = jest.fn();
    const dom = render(
        <Stepper
            steps={steps}
            renderBubble={renderBubble}
            currentStepIndex={1}
            styles={styles}
        />
    )
    const label1 = await getById(dom.container, "step-label-1");
    expect(label1.innerHTML).toBe('Step 2');
    const description1 = await getById(dom.container, "step-description-1");
    expect(description1.innerHTML).toBe('Demo description 2');
})

test("Stepper Component - orientation:vertical and labelPosition: top", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }]
    const dom = render(<Stepper steps={steps} orientation={ORIENTATION.HORIZONTAL} labelPosition={LABEL_POSITION.TOP}  />)
    const label = await getById(dom.container, "step-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-horizontal-top-description-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - orientation:vertical and labelPosition: bottom", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }]
    const dom = render(<Stepper steps={steps} orientation={ORIENTATION.HORIZONTAL} labelPosition={LABEL_POSITION.BOTTOM}  />)
    const label = await getById(dom.container, "step-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-description-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - orientation:vertical and labelPosition: bottom", async () => {
    const steps: IStep[] = [{
        label: 'Step 1',
        description: 'Demo description',
        status: 'completed'
    }]
    const dom = render(<Stepper steps={steps} orientation={ORIENTATION.HORIZONTAL} labelPosition={LABEL_POSITION.LEFT}  />)
    const label = await getById(dom.container, "step-inline-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-description-0");
    expect(description.innerHTML).toBe('Demo description');
});