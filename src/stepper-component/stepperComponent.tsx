import React, { ReactElement, FC } from 'react';
import classes from './styles.module.scss';
import type { IStep, IStepperProps } from './types';
import Bubble from '../bubble';
import { LABEL_POSITION, Elements } from '../constants';

const Stepper: FC<IStepperProps> = (props) => {
  const {
    steps,
    currentStepIndex = 0,
    onStepClick,
    renderBubble,
    styles = {},
    labelPosition = LABEL_POSITION.RIGHT
  } = props;

  const getStyles = (element: Elements, step: IStep, index: number): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle(step, index);
    }
    return {};
  };

  return (
    <div className={classes.stepperContainer}>
      {steps?.map((step: IStep, stepIndex: number): ReactElement => (
        <div key={stepIndex} className={classes.eachStep} data-testId="stepper-steps">
          <div className={classes.bubbleLineWrapper}>
            <Bubble
              step={step}
              index={stepIndex}
              currentStepIndex= {currentStepIndex}
              handleStepClick={(): void => onStepClick && onStepClick(step, stepIndex)}
              showCursor={!!onStepClick}
              renderAdornment={renderBubble}
              getStyles={(element: Elements): object => getStyles(element, step, stepIndex)}
            />
            <div className={`${classes.labelContainer} ${classes[`labelContainer__${labelPosition || LABEL_POSITION.RIGHT}`]}`}>
              {step?.label && (
                <span
                  className={`${classes.labelTitle}
                  ${onStepClick && classes.cursorPointer}
                  ${stepIndex === currentStepIndex && classes.activeLabelTitle}`}
                  style={{
                    ...((getStyles(Elements.LabelTitle, step, stepIndex)) || {}),
                    ...((stepIndex === currentStepIndex && getStyles(Elements.ActiveLabelTitle, step, stepIndex)) || {})
                  }}
                  onClick={(): void => onStepClick && onStepClick(step, stepIndex)}
                  role="presentation"
                  data-testId={`stepper-label-${stepIndex}`}
                >
                  {step.label}
                </span>
              )}
              {step?.description && (
                <span
                  className={`${classes.labelDescription}
                  ${onStepClick && classes.cursorPointer}
                  ${stepIndex === currentStepIndex && classes.activeLabelDescription}`}
                  style={{
                    ...((getStyles(Elements.LabelDescription, step, stepIndex)) || {}),
                    ...((stepIndex === currentStepIndex &&
                      getStyles(Elements.ActiveLabelDescription, step, stepIndex)) || {})
                  }}
                  onClick={(): void => onStepClick && onStepClick(step, stepIndex)}
                  role="presentation"
                  data-testId={`stepper-desc-${stepIndex}`}
                >
                  {step.description}
                </span>
              )}
            </div>
            {stepIndex < steps?.length - 1 && (
              <div
                className={`${classes.lineSeparator}
                ${stepIndex > currentStepIndex - 1 && classes.inactiveStepLineSeparator}`}
                style={{
                  ...((getStyles(Elements.LineSeparator, step, stepIndex)) || {}),
                  ...((stepIndex > currentStepIndex - 1
                  && getStyles(Elements.InactiveLineSeparator, step, stepIndex)) || {})
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;