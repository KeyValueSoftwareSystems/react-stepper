import React, { useRef, useEffect, useState } from "react";
import "./styles.scss";
import type { IStepProps } from "./types";
import { LABEL_POSITION, ORIENTATION } from "../constants";
import StepContent from "./stepContent";
import StepInfo from "./stepInfo";

//  Each step consists of a node, a label, and connectors to the previous and next steps.
const Step: (props: IStepProps) => JSX.Element = ({
  stepperProps,
  step,
  index
}: IStepProps) => {
  const {
    steps,
    currentStepIndex = 0,
    styles = {},
    labelPosition = LABEL_POSITION.RIGHT,
    orientation = ORIENTATION.VERTICAL,
    showDescriptionsForAllSteps = false,
    stepContent,
    onStepClick,
    renderNode,
    completedNodeStyle,
    currentNodeStyle
  } = stepperProps;
  const [nodeWidth, setNodeWidth] = useState(0);

  const isVertical = orientation === ORIENTATION.VERTICAL;

  /* isInlineLabelsAndSteps = true means label and steps are in the same axis (eg: Horizontal stepper with label direction left/right and
   vertical stepper with label direction top/bottom) */
  const isInlineLabelsAndSteps =
    (isVertical &&
      ![LABEL_POSITION.LEFT, LABEL_POSITION.RIGHT].includes(labelPosition)) ||
    (!isVertical &&
      [LABEL_POSITION.LEFT, LABEL_POSITION.RIGHT].includes(labelPosition));

  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const width = node.getBoundingClientRect().width;
      setNodeWidth(width);
    }
  }, [steps, labelPosition, orientation]);

  // prevConnector represents the connector line from the current step's node (nth node) to the preceding step's node (n-1 th node).
  const prevConnectorClassName = `stepConnector leftConnector ${
    steps[index - 1]?.completed ? "activeConnector" : ""
  } ${index === 0 ? "hiddenConnector" : ""}`;

  // nextConnector represents the connector line from the current step's node (nth node) to the preceding step's node (n-1 th node).

  const nextConnectorClassName = `stepConnector rightConnector ${
    steps[index]?.completed ? "activeConnector" : ""
  } ${index === steps.length - 1 ? "hiddenConnector" : ""}`;

  /* middleConnector connects the current step nextConnector to (n+1th) step prevConnector,
  allowing the display of descriptions or content between the two steps when necessary.  */

  const middleConnectorClassName = `middleStepConnector ${
    currentStepIndex > index ? "activeConnector" : ""
  } ${index === steps.length - 1 ? "hiddenConnector" : ""}`;

  const stepInfoProps = {
    orientation,
    labelPosition,
    isVertical,
    isInlineLabelsAndSteps,
    index,
    currentStepIndex,
    step,
    showDescriptionsForAllSteps,
    onStepClick,
    renderNode,
    styles,
    nodeRef,
    prevConnectorClassName,
    nextConnectorClassName,
    steps,
    completedNodeStyle,
    currentNodeStyle
  };

  return orientation !== ORIENTATION.VERTICAL &&
    labelPosition === LABEL_POSITION.TOP ? (
      <StepInfo {...stepInfoProps} />
    ) : (
      <div
        className={
          orientation === ORIENTATION.VERTICAL &&
          labelPosition === LABEL_POSITION.LEFT
            ? "verticalTextLeftContainer"
            : ""
        }
      >
        <StepInfo {...stepInfoProps} />
        <StepContent
          labelPosition={labelPosition}
          isVertical={isVertical}
          currentStepIndex={currentStepIndex}
          index={index}
          styles={styles}
          step={step}
          showDescriptionsForAllSteps={showDescriptionsForAllSteps}
          middleConnectorClassName={middleConnectorClassName}
          stepContent={stepContent}
          nodeWidth={nodeWidth}
        />
      </div>
    );
};

export default Step;
