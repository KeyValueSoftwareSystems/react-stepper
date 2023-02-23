import React, { useState, useEffect, ReactElement, FC } from 'react';
import classes from './styles.module.scss';
import { IStep, IStepperProps } from './types';
import Bubble from '../bubble';
import { LABEL_POSITION } from '../constants';

const Stepper: FC<IStepperProps> = (props) => {
  const {
    steps,
    currentStepIndex,
    onStepClick,
    renderBubble,
    styles = {},
    labelPosition = LABEL_POSITION.RIGHT
  } = props;

  const {
    getLabelDescriptionStyles,
    getLabelTitleStyles,
    getActiveLabelTitleStyles,
    getActiveLabelDescriptionStyles,
    getLineSeparatorStyles,
    getInactiveLineSeparatorStyles,
    getBubbleStyles,
    getActiveBubbleStyles,
    getInActiveBubbleStyles
  } = styles;

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
              renderAdornment={renderBubble}
              getBubbleStyles={getBubbleStyles}
              getActiveBubbleStyles={getActiveBubbleStyles}
              getInActiveBubbleStyles={getInActiveBubbleStyles}
            />
            <div className={`${classes.labelContainer} ${classes[`labelContainer__${labelPosition || LABEL_POSITION.RIGHT}`]}`}>
              {step?.label && (
                <span
                  className={`${classes.labelTitle}
                  ${onStepClick && classes.cursorPointer}
                  ${stepIndex === currentStepIndex && classes.activeLabelTitle}`}
                  style={{
                    ...((getLabelTitleStyles && getLabelTitleStyles(step, stepIndex)) || {}),
                    ...((stepIndex === currentStepIndex && getActiveLabelTitleStyles && getActiveLabelTitleStyles(step, stepIndex)) || {})
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
                    ...((getLabelDescriptionStyles && getLabelDescriptionStyles(step, stepIndex)) || {}),
                    ...((stepIndex === currentStepIndex &&
                      getActiveLabelDescriptionStyles && getActiveLabelDescriptionStyles(step, stepIndex)) || {})
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
                ${currentStepIndex && stepIndex > currentStepIndex - 1 && classes.inactiveStepLineSeparator}`}
                style={{
                  ...((getLineSeparatorStyles && getLineSeparatorStyles(step, stepIndex)) || {}),
                  ...(( currentStepIndex && stepIndex > currentStepIndex - 1
                  && getInactiveLineSeparatorStyles && getInactiveLineSeparatorStyles(step, stepIndex)) || {})
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