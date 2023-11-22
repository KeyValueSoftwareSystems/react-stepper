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
        stepLabel: 'Step 1',
        stepDescription: 'Demo description',
        completed: true,
    }]
    const dom = render(<Stepper steps={steps}  />)
    const label = await getById(dom.container, "step-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-description-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - No description", async () => {
    const steps: IStep[] = [{
        stepLabel: 'Step 1',
        completed: true,
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
        stepLabel: 'Step 1',
        stepDescription: "Step 1 description",
        completed: true,
    },{
        stepLabel: 'Step 2',
        stepDescription: "Step 2 description",
        completed: false,
    },
    {
        stepLabel: 'Step 3',
        stepDescription: "Step 3 description",
        completed: false,
    }];
    const dom = render(<Stepper steps={steps} />);
    const elements = await getAllById(dom.container, "stepper-step");
    expect(elements?.length).toBe(3);
})

test("Stepper Component - On Click function", async () => {
    const steps: IStep[] = [{
        stepLabel: 'Step 1',
        stepDescription: 'Demo description',
        completed: true,
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
        stepLabel: 'Step 1',
        stepDescription: 'Demo description',
        completed: true,
    }];
    const renderBubble = jest.fn();
    const dom = render(
        <Stepper
            steps={steps}
            renderNode={renderBubble}
        />
    )
    const bubble = await getById(dom.container, "stepper-bubble");
    fireEvent.click(bubble);
    expect(renderBubble).toBeCalled();
})

test("Stepper Component - custom style", async () => {
    const steps: IStep[] = [{
        stepLabel: 'Step 1',
        stepDescription: 'Demo description 1',
        completed: true,
    },
    {
        stepLabel: 'Step 2',
        stepDescription: 'Demo description 2',
        completed: false,
    },
    {
        stepLabel: 'Step 1',
        stepDescription: 'Demo description 3',
        completed: false,
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
            renderNode={renderBubble}
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
        stepLabel: 'Step 1',
        stepDescription: 'Demo description',
        completed: true,
    }]
    const dom = render(<Stepper steps={steps} orientation={ORIENTATION.HORIZONTAL} labelPosition={LABEL_POSITION.TOP}  />)
    const label = await getById(dom.container, "step-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-horizontal-top-description-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - orientation:vertical and labelPosition: bottom", async () => {
    const steps: IStep[] = [{
        stepLabel: 'Step 1',
        stepDescription: 'Demo description',
        completed: true,
    }]
    const dom = render(<Stepper steps={steps} orientation={ORIENTATION.HORIZONTAL} labelPosition={LABEL_POSITION.BOTTOM}  />)
    const label = await getById(dom.container, "step-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-description-0");
    expect(description.innerHTML).toBe('Demo description');
});

test("Stepper Component - orientation:vertical and labelPosition: bottom", async () => {
    const steps: IStep[] = [{
        stepLabel: 'Step 1',
        stepDescription: 'Demo description',
        completed: true,
    }]
    const dom = render(<Stepper steps={steps} orientation={ORIENTATION.HORIZONTAL} labelPosition={LABEL_POSITION.LEFT}  />)
    const label = await getById(dom.container, "step-inline-label-0");
    expect(label.innerHTML).toBe('Step 1');
    const description = await getById(dom.container, "step-description-0");
    expect(description.innerHTML).toBe('Demo description');
});