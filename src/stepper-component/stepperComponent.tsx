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
        <div key={stepIndex} className={classes.eachStep} id="stepper-steps">
          <div className={classes.bubbleLineWrapper}>
            <Bubble
              step={step}
              index={stepIndex}
              currentStepIndex= {currentStepIndex}
              handleStepClick={(): void => onStepClick && onStepClick(step, stepIndex)}
              showCursor={!!onStepClick}
              renderAdornment={renderBubble}
              getStyles={(element: Elements): object => getStyles(element, step, stepIndex)}
              labelPosition={labelPosition}
            />
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