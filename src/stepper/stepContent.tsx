import React from "react";
import "./styles.scss";
import { LABEL_POSITION, Elements } from "../constants";
import getStyles from "../utils/getStyles";
import { IStepContentProps } from "./types";

const StepContent: (props: IStepContentProps) => JSX.Element = ({
  labelPosition,
  isVertical,
  currentStepIndex,
  index,
  styles,
  step,
  showDescriptionsForAllSteps,
  middleConnectorClassName,
  stepContent,
  nodeWidth
}: IStepContentProps) => (
  <div
    className={`descriptionContainer ${
      labelPosition === "left" ? "labelLeft leftDescription" : ""
    }`}
  >
    {isVertical && (
      /* In a vertical stepper, utilize an extra middle connector to dynamically adjust the length based on the height of step descriptions.
  This ensures a visually balanced layout by accommodating varying content heights. */
      <div
        className={
          labelPosition === LABEL_POSITION.LEFT
            ? "leftContentMiddleConnectorWrapper"
            : "middleConnectorWrapper"
        }
        style={{
          width: nodeWidth / 2 + 1
        }}
      >
        <div
          className={middleConnectorClassName}
          style={{
            ...(step.completed
              ? getStyles(styles, Elements.LineSeparator, step, index) || {}
              : getStyles(
                styles,
                Elements.InactiveLineSeparator,
                step,
                index
              ) || {})
          }}
        />
      </div>
    )}
    <div className={isVertical ? "verticalContentWrapper" : ""}>
      {step.stepDescription && (showDescriptionsForAllSteps || index === currentStepIndex) &&  (
        <div
          className="description"
          id={`step-description-${index}`}
          style={{
            ...(currentStepIndex === index
              ? getStyles(
                styles,
                Elements.ActiveLabelDescription,
                step,
                index
              ) || {}
              : getStyles(styles, Elements.LabelDescription, step, index) ||
                {})
          }}
        >
          {step.stepDescription}
        </div>
      )}
      {isVertical &&
        index === currentStepIndex &&
        stepContent &&
        stepContent(step, index)}
    </div>
  </div>
);

export default StepContent;
