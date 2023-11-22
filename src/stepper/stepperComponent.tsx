import React, { useRef, useEffect, useState } from "react";
import "./styles.scss";
import type { IStep, IStepperProps, IStepProps } from "./types";
import Bubble from "../node";
import { LABEL_POSITION, Elements, ORIENTATION } from "../constants";

//  Each step consists of a node, a label, and connectors to the previous and next steps.
const Step: (props: IStepProps) => JSX.Element = ({ stepperProps, step, index }: IStepProps) => {
  const {
    steps,
    currentStepIndex = 0,
    styles = {},
    labelPosition = LABEL_POSITION.RIGHT,
    orientation = ORIENTATION.VERTICAL,
    showDescriptionsForAllSteps = false,
    stepContent,
    onStepClick,
    renderNode
  } = stepperProps;
  const { stepLabel, stepDescription } = step;
  const [bubbleWidth, setBubbleWidth] = useState(0);

  const isVertical = orientation === ORIENTATION.VERTICAL;

  /* isInline = true means label and steps are in the same axis (eg: Horizontal stepper with label direction left/right and
   vertical stepper with label direction top/bottom) */
  const isInline =
   (isVertical &&
     [LABEL_POSITION.TOP, LABEL_POSITION.BOTTOM].includes(labelPosition)) ||
   (!isVertical &&
     [LABEL_POSITION.LEFT, LABEL_POSITION.RIGHT].includes(labelPosition));

  const getStyles = (element: Elements, step: IStep, index: number): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle(step, index);
    }
    return {};
  };

  const bubbleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;

    if (bubble) {
      const width = bubble.getBoundingClientRect().width;
      setBubbleWidth(width);
    }
  }, []);

  // prevConnector represents the connector line from the current step's node (nth node) to the preceding step's node (n-1 th node).
  const prevConnectorClassName = `stepConnector leftConnector ${
    currentStepIndex >= index ? "activeConnector" : ""
  } ${index === 0 ? "hiddenConnector" : ""}`;

  // nextConnector represents the connector line from the current step's node (nth node) to the preceding step's node (n-1 th node).

  const nextConnectorClassName = `stepConnector rightConnector ${
    currentStepIndex > index ? "activeConnector" : ""
  } ${index === steps.length - 1 ? "hiddenConnector" : ""}`;

  /* middleConnector connects the current step nextConnector to (n+1th) step prevConnector,
  allowing the display of descriptions or content between the two steps when necessary.  */

  const middleConnectorClassName = `middleStepConnector ${
    currentStepIndex > index ? "activeConnector" : ""
  } ${index === steps.length - 1 ? "hiddenConnector" : ""}`;

  const getLabelStyle: () => string | undefined = () => {
    if (orientation === ORIENTATION.HORIZONTAL) {
      if (labelPosition === LABEL_POSITION.TOP) return "horizontalLabelTop";
      else if (labelPosition === LABEL_POSITION.BOTTOM)
        return "horizontalLabelBottom";
    } else if (labelPosition === LABEL_POSITION.RIGHT)
      return "verticalLabelRight";
  };

  const StepContent: () => JSX.Element = () => <div
    className={`descriptionContainer ${
      labelPosition === "left" ? "labelLeft leftDescription" : ""
    }`}
  >
    {isVertical && (
    /* In a vertical stepper, utilize an extra middle connector to dynamically adjust the length based on the height of step descriptions.
  This ensures a visually balanced layout by accommodating varying content heights. */
      <div
        className="middleConnectorWrapper"
        style={{
          width: bubbleWidth
        }}
      >
        <div
          className={middleConnectorClassName}
          style={{
            ...(currentStepIndex > index
              ? getStyles(Elements.LineSeparator, step, index) || {}
              : getStyles(Elements.InactiveLineSeparator, step, index) ||
            {})
          }}
        />
      </div>
    )}
    <div>
      {(showDescriptionsForAllSteps || index === currentStepIndex) && (
        <div className="description" id={`step-description-${index}`}>
          {stepDescription}
        </div>
      )}
      {isVertical &&
    index === currentStepIndex &&
    stepContent &&
    stepContent(step, index)}
    </div>
  </div>

  const StepComponent: () => JSX.Element = () => (
    <div
      id="stepper-step"
      className={
        isVertical
          ? `verticalStepperWrapper ${
            labelPosition === LABEL_POSITION.LEFT ? "labelLeft" : ""
          }`
          : "horizontalStepperWrapper"
      }
    >
      {!isInline && (
        <div className={getLabelStyle()}>
          <div
            className="label"
            id={`step-label-${index}`}
            style={{
              ...(getStyles(Elements.LabelTitle, step, index) || {}),
              ...(index === currentStepIndex &&
                (getStyles(Elements.ActiveLabelTitle, step, index) || {}))
            }}
          >
            {stepLabel}
          </div>
          {(showDescriptionsForAllSteps || index === currentStepIndex) &&
            orientation === ORIENTATION.HORIZONTAL &&
            labelPosition === LABEL_POSITION.TOP && (
            <div
              className="description"
              id={`step-horizontal-top-description-${index}`}
            >
              {stepDescription}
            </div>
          )}
        </div>
      )}
      <div className="stepContainer" id={`${index}-bubble`} ref={bubbleRef}>
        <div
          className={prevConnectorClassName}
          style={{
            ...(currentStepIndex >= index
              ? getStyles(Elements.LineSeparator, step, index) || {}
              : getStyles(Elements.InactiveLineSeparator, step, index) || {})
          }}
        />
        <div
          className={`bubble ${
            [LABEL_POSITION.TOP, LABEL_POSITION.LEFT].includes(labelPosition)
              ? "reversedBubble"
              : ""
          }`}
        >
          <Bubble
            step={step}
            index={index}
            currentStepIndex={currentStepIndex}
            handleStepClick={(): void =>
              onStepClick && onStepClick(step, index)
            }
            showCursor={!!onStepClick}
            renderNode={renderNode}
            getStyles={(element: Elements): object =>
              getStyles(element, step, index)
            }
          />
        </div>
        {isInline && (
          <div
            className={`labelContainer ${
              [LABEL_POSITION.TOP, LABEL_POSITION.LEFT].includes(labelPosition)
                ? "reversedLabelContainer"
                : ""
            }`}
          >
            <div className="label" id={`step-inline-label-${index}`}>
              {stepLabel}
            </div>
          </div>
        )}
        <div
          className={nextConnectorClassName}
          style={{
            ...(currentStepIndex > index
              ? getStyles(Elements.LineSeparator, step, index) || {}
              : getStyles(Elements.InactiveLineSeparator, step, index) || {})
          }}
        />
      </div>
    </div>
  );

  return orientation === ORIENTATION.HORIZONTAL &&
    labelPosition === LABEL_POSITION.TOP ? (
      StepComponent()
    ) : (
      <div
        className={
          orientation === ORIENTATION.VERTICAL &&
        labelPosition === LABEL_POSITION.LEFT
            ? "verticalTextLeftContainer"
            : ""
        }
      >
        {StepComponent()}
        {StepContent()}
      </div>
    );
};

const Stepper = (props: IStepperProps): JSX.Element => {
  const {
    steps,
    currentStepIndex = 0,
    orientation = ORIENTATION.VERTICAL,
    stepContent
  } = props;

  const isVertical = orientation === ORIENTATION.VERTICAL;

  return (
    <>
      <ul
        className={`stepper ${
          isVertical ? "verticalStepper" : "horizontalStepper"
        }`}
      >
        {steps.map((step, index) => Step({stepperProps: props, step, index}))}
      </ul>
      {!isVertical && // For horizontal stepper, the content is displayed below the stepper with full width
        stepContent &&
        stepContent(steps[currentStepIndex], currentStepIndex)}
    </>
  );
};

export default Stepper;
