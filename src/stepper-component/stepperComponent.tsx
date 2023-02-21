import React, { useState, useEffect, ReactElement } from 'react';
import styles from './styles';
import { Istep, IstepperProps } from './types';
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES } from './constants';

const Stepper = (props: IstepperProps): ReactElement => {
  const { steps, currentActiveStepIndex, onStepClick, enableStepClick = false } = props;

  const [currentActiveStepIndexVal, setCurrentActiveStepIndexVal] = useState<number>()

  useEffect(() => {
    setCurrentActiveStepIndexVal(currentActiveStepIndex ?? 0);
  }, [currentActiveStepIndex]);

  const handleStepClick = (stepIndex: number): void => {
    if (enableStepClick) {
      if (onStepClick !== undefined ) onStepClick(stepIndex);
      else setCurrentActiveStepIndexVal(stepIndex);
    }
  }

  return (
    <div style={styles.stepperContainer}>
      {steps?.map((step: Istep, index: number): ReactElement => (
        <div key={index} style={styles.eachStep}>
          <div style={styles.bubbleLineWrapper}>
            <div
              style={{...styles.eachBubble,
                ...((enableStepClick && styles.cursorPointer) || {}),
                ...((index === currentActiveStepIndexVal) && styles.activeStepBubble || {}),
                ...((step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index) && styles.inactiveStepBubble || {})
              }}
              onClick={(): void => handleStepClick(index)}
              role="presentation"
            >
              {step?.status === STEP_STATUSES.COMPLETED && (
                <img
                  src={whiteTick}
                  style={styles.whiteTickImg}
                  alt=""
                />
              )
              || index + 1}
            </div>
            <div style={styles.eachLabel}>
              {step?.label && (
                <span
                  style={{...styles.labelTitle,
                    ...((index === currentActiveStepIndexVal && styles.activeLabelTitle) || {})}}
                  onClick={(): void => handleStepClick(index)}
                  role="presentation"
                >
                  {step.label}
                </span>
              )}
              {step?.description && (
                <span style={{...styles.labelDescription,
                  ...((index === currentActiveStepIndexVal) && styles.activeLabelDescription|| {})}}>
                  {step.description}
                </span>
              )}
            </div>
            {index < steps?.length - 1 && (
              <div style={{...styles.lineSeparator,
                ...((index > currentActiveStepIndexVal - 1) && styles.activeStepLineSeparator || {})}} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;