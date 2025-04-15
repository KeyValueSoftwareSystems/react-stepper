import React, { CSSProperties }  from "react";
import "./styles.scss";
import type { IStepInfoProps } from "./types";
import Node from "../node";
import { LABEL_POSITION, Elements, ORIENTATION } from "../constants";
import getStyles from "../utils/getStyles";
import getLabelStyle from "../utils/getLabelStyle";

interface NodeStyles {
  elementStyle: Elements;
  customStyle: CSSProperties | undefined;
}

const StepInfo: (props: IStepInfoProps) => JSX.Element = ({
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
}: IStepInfoProps) => {
  const getNodeStyle = (): CSSProperties => {
    const defaultStyles = getStyles(styles, Elements.Node, step, index) as CSSProperties;
    const isCompleted = step.completed;
    const isActive = index === currentStepIndex;

    const getNodeStyles = (): NodeStyles => {
      switch (true) {
      case isCompleted:
        return {
          elementStyle: Elements.CompletedNode,
          customStyle: completedNodeStyle
        };
      case isActive:
        return {
          elementStyle: Elements.ActiveNode,
          customStyle: currentNodeStyle
        };
      default:
        return {
          elementStyle: Elements.InActiveNode,
          customStyle: undefined
        };
      }
    };

    const { elementStyle, customStyle } = getNodeStyles();

    return {
      ...defaultStyles,
      ...(getStyles(styles, elementStyle, step, index) as CSSProperties),
      ...(customStyle || {})
    };
  };

  return (
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
      {!isInlineLabelsAndSteps && (
        <div className={getLabelStyle(orientation, labelPosition)} onClick={(): void => onStepClick && onStepClick(step, index)}>
          <div
            className="label"
            id={`step-label-${index}`}
            style={{
              ...(getStyles(styles, Elements.LabelTitle, step, index) || {}),
              ...(index === currentStepIndex &&
                (getStyles(styles, Elements.ActiveLabelTitle, step, index) ||
                  {}))
            }}
          >
            {step.stepLabel}
          </div>
          {step.stepDescription && (showDescriptionsForAllSteps || index === currentStepIndex) &&
            orientation !== ORIENTATION.VERTICAL &&
            labelPosition === LABEL_POSITION.TOP && (
            <div
              className="description"
              id={`step-horizontal-top-description-${index}`}
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
        </div>
      )}
      <div className="stepContainer" id={`${index}-node`} ref={nodeRef}>
        <div
          className={prevConnectorClassName}
          style={{
            ...(steps[index - 1]?.completed
              ? getStyles(styles, Elements.LineSeparator, step, index) || {}
              : getStyles(styles, Elements.InactiveLineSeparator, step, index) ||
                {})
          }}
        />
        <div
          className={`node ${
            [LABEL_POSITION.TOP, LABEL_POSITION.LEFT].includes(labelPosition)
              ? "reversedNode"
              : ""
          }`}
        >
          <Node
            step={step}
            index={index}
            currentStepIndex={currentStepIndex}
            handleStepClick={(): void => onStepClick && onStepClick(step, index)}
            showCursor={!!onStepClick}
            renderNode={renderNode}
            getStyles={(element: Elements): object =>
              getStyles(styles, element, step, index)
            }
            nodeStyle={getNodeStyle()}
          />
        </div>
        {isInlineLabelsAndSteps && (
          <div
            className={`labelContainer ${
              [LABEL_POSITION.TOP, LABEL_POSITION.LEFT].includes(labelPosition)
                ? "reversedLabelContainer"
                : ""
            }`}
          >
            <div
              className={`label ${isVertical && "verticalStepperInlineLabel"}`}
              id={`step-inline-label-${index}`}
              style={{
                ...(getStyles(styles, Elements.LabelTitle, step, index) || {}),
                ...(index === currentStepIndex &&
                  (getStyles(styles, Elements.ActiveLabelTitle, step, index) ||
                    {}))
              }}
              onClick={(): void => onStepClick && onStepClick(step, index)}
            >
              {step.stepLabel}
            </div>
          </div>
        )}
        <div
          className={nextConnectorClassName}
          style={{
            ...(step.completed
              ? getStyles(styles, Elements.LineSeparator, step, index) || {}
              : getStyles(styles, Elements.InactiveLineSeparator, step, index) ||
                {})
          }}
        />
      </div>
    </div>
  );
};

export default StepInfo;
