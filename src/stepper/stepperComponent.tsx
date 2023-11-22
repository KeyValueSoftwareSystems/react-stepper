import React, { FC, useRef, useEffect, useState } from "react";
import "./styles.scss";
import type { IStep, IStepperProps } from "./types";
import Bubble from "../bubble";
import { LABEL_POSITION, Elements, ORIENTATION } from "../constants";

const Stepper = (props: IStepperProps): any => {
  const {
    steps,
    currentStepIndex = 0,
    styles = {},
    labelPosition = LABEL_POSITION.RIGHT,
    orientation = ORIENTATION.VERTICAL,
    showAllDescriptions = false,
    renderContent,
    onStepClick,
    renderBubble,
  } = props;

  const isVertical = orientation === ORIENTATION.VERTICAL;

  // isInline = true means label and steps are in the same axis (eg: Horizontal stepper with label direction left/right and vertical stepper with label direction top/bottom)
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

  const renderStep: FC<IStep> = (step, idx) => {
    const { label, description } = step;
    const [bubbleWidth, setBubbleWidth] = useState(0);

    const bubbleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const bubble = bubbleRef.current;

      if (bubble) {
        const width = bubble.getBoundingClientRect().width;
        setBubbleWidth(width);
      }
    }, []);

    const leftConnectorClassName = `stepConnector leftConnector ${
      currentStepIndex >= idx ? "activeConnector" : ""
    } ${idx === 0 ? "hiddenConnector" : ""}`;

    const middleConnectorClassName = `middleStepConnector ${
      currentStepIndex > idx ? "activeConnector" : ""
    } ${idx === steps.length - 1 ? "hiddenConnector" : ""}`;

    const rightConnectorClassName = `stepConnector rightConnector ${
      currentStepIndex > idx ? "activeConnector" : ""
    } ${idx === steps.length - 1 ? "hiddenConnector" : ""}`;

    const getLabelStyle = () => {
      if (orientation === ORIENTATION.HORIZONTAL) {
        if (labelPosition === LABEL_POSITION.TOP) return "horizontalLabelTop";
        else if (labelPosition === LABEL_POSITION.BOTTOM)
          return "horizontalLabelBottom";
      } else {
        if (labelPosition === LABEL_POSITION.RIGHT) return "verticalLabelRight";
      }
    };

    const defaultRenderStep = () => {
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
          {!isInline && (
            <div className={getLabelStyle()}>
              <div
                className="label"
                id={`step-label-${idx}`}
                style={{
                  ...(getStyles(Elements.LabelTitle, step, idx) || {}),
                  ...(idx === currentStepIndex &&
                    (getStyles(Elements.ActiveLabelTitle, step, idx) || {})),
                }}
              >
                {label}
              </div>
              {(showAllDescriptions || idx === currentStepIndex) &&
                orientation === ORIENTATION.HORIZONTAL &&
                labelPosition === LABEL_POSITION.TOP && (
                  <div
                    className="description"
                    id={`step-horizontal-top-description-${idx}`}
                  >
                    {description}
                  </div>
                )}
            </div>
          )}
          <div className="stepContainer" id={`${idx}-bubble`} ref={bubbleRef}>
            <div
              className={leftConnectorClassName}
              style={{
                ...(currentStepIndex >= idx
                  ? getStyles(Elements.LineSeparator, step, idx) || {}
                  : getStyles(Elements.InactiveLineSeparator, step, idx) || {}),
              }}
            />
            <div
              className={`bubble ${
                [LABEL_POSITION.TOP, LABEL_POSITION.LEFT].includes(
                  labelPosition
                )
                  ? "reversedBubble"
                  : ""
              }`}
            >
              <Bubble
                step={step}
                index={idx}
                currentStepIndex={currentStepIndex}
                handleStepClick={(): void =>
                  onStepClick && onStepClick(step, idx)
                }
                showCursor={!!onStepClick}
                renderAdornment={renderBubble}
                getStyles={(element: Elements): object =>
                  getStyles(element, step, idx)
                }
              />
            </div>
            {isInline && (
              <div
                className={`labelContainer ${
                  [LABEL_POSITION.TOP, LABEL_POSITION.LEFT].includes(
                    labelPosition
                  )
                    ? "reversedLabelContainer"
                    : ""
                }`}
              >
                <div className="label" id={`step-inline-label-${idx}`}>
                  {label}
                </div>
              </div>
            )}
            <div
              className={rightConnectorClassName}
              style={{
                ...(currentStepIndex > idx
                  ? getStyles(Elements.LineSeparator, step, idx) || {}
                  : getStyles(Elements.InactiveLineSeparator, step, idx) || {}),
              }}
            />
          </div>
        </div>
      );
    };

    return orientation === ORIENTATION.HORIZONTAL &&
      labelPosition === LABEL_POSITION.TOP ? (
      defaultRenderStep()
    ) : (
      <div
        className={
          orientation === ORIENTATION.VERTICAL &&
          labelPosition === LABEL_POSITION.LEFT
            ? "verticalTextLeftContainer"
            : ""
        }
      >
        {defaultRenderStep()}
        <div
          className={`descriptionContainer ${
            labelPosition === "left" ? "labelLeft leftDescription" : ""
          }`}
        >
          {isVertical && (
            <div
              className="middleConnectorWrapper"
              style={{
                width: bubbleWidth,
              }}
            >
              <div
                className={middleConnectorClassName}
                style={{
                  ...(currentStepIndex > idx
                    ? getStyles(Elements.LineSeparator, step, idx) || {}
                    : getStyles(Elements.InactiveLineSeparator, step, idx) ||
                      {}),
                }}
              />
            </div>
          )}
          <div>
            {(showAllDescriptions || idx === currentStepIndex) && (
              <div className="description" id={`step-description-${idx}`}>
                {description}
              </div>
            )}
            {isVertical &&
              idx === currentStepIndex &&
              renderContent &&
              renderContent(step, idx)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ul
        className={`stepper ${
          isVertical ? "verticalStepper" : "horizontalStepper"
        }`}
      >
        {steps.map(renderStep)}
      </ul>
      {!isVertical &&
        renderContent &&
        renderContent(steps[currentStepIndex], currentStepIndex)}
    </>
  );
};

export default Stepper;
