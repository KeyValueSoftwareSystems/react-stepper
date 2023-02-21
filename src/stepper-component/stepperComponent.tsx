import React, { useState, useEffect, ReactElement } from 'react';
import styles from './styles';
import { IStep, IStepperProps } from './types';
import Bubble from '../bubble';

const Stepper = (props: IStepperProps): ReactElement => {
  const { steps, currentActiveStepIndex, onStepClick, enableStepClick = false, renderAdornment } = props;

  const [currentActiveStepIndexVal, setCurrentActiveStepIndexVal] = useState<number>();

  useEffect(() => {
    setCurrentActiveStepIndexVal(currentActiveStepIndex ?? 0);
  }, [currentActiveStepIndex]);

  const handleStepClick = (stepIndex: number): void => {
    if (enableStepClick) {
      if (onStepClick) onStepClick(stepIndex);
      else setCurrentActiveStepIndexVal(stepIndex);
    }
  }

  return (
    <div style={styles.stepperContainer}>
      {steps?.map((step: IStep, index: number): ReactElement => (
        <div key={index} style={styles.eachStep}>
          <div style={styles.bubbleLineWrapper}>
            <Bubble
              step={step}
              index={index}
              enableStepClick={enableStepClick}
              currentActiveStepIndexVal= {currentActiveStepIndexVal}
              handleStepClick={handleStepClick}
              renderAdornment={renderAdornment}
            />
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