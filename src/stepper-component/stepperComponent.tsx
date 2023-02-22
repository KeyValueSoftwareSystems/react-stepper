import React, { useState, useEffect, ReactElement, FC } from 'react';
import styles from './styles';
import { IStep, IStepperProps } from './types';
import Bubble from '../bubble';
import { LABEL_POSITION } from '../bubble/constants';

const Stepper: FC<IStepperProps> = (props) => {
  const {
    steps,
    currentActiveStepIndex,
    enableStepClick = false,
    onStepClick,
    renderAdornment,
    stylesOverride = {},
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
  } = stylesOverride;

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
              getBubbleStyles={getBubbleStyles}
              getActiveBubbleStyles={getActiveBubbleStyles}
              getInActiveBubbleStyles={getInActiveBubbleStyles}
            />
            <div
              style={{
                ...styles.labelContainer,
                ...styles[`labelContainer__${labelPosition}`] ?? {}
              }}
            >
              {step?.label && (
                <span
                  style={{...styles.labelTitle,
                    ...((getLabelTitleStyles && getLabelTitleStyles(step, index)) || {}),
                    ...((index === currentActiveStepIndexVal && styles.activeLabelTitle) || {}),
                    ...((index === currentActiveStepIndexVal && getActiveLabelTitleStyles && getActiveLabelTitleStyles(step, index)) || {})
                  }}
                  onClick={(): void => handleStepClick(index)}
                  role="presentation"
                >
                  {step.label}
                </span>
              )}
              {step?.description && (
                <span style={{...styles.labelDescription,
                  ...((getLabelDescriptionStyles && getLabelDescriptionStyles(step, index)) || {}),
                  ...((index === currentActiveStepIndexVal) && styles.activeLabelDescription|| {}),
                  ...((index === currentActiveStepIndexVal && getActiveLabelDescriptionStyles && getActiveLabelDescriptionStyles(step, index)) || {})
                }}>
                  {step.description}
                </span>
              )}
            </div>
            {index < steps?.length - 1 && (
              <div style={{...styles.lineSeparator,
                ...((getLineSeparatorStyles && getLineSeparatorStyles(step, index)) || {}),
                ...((currentActiveStepIndexVal && index > currentActiveStepIndexVal - 1) && styles.inactiveStepLineSeparator || {}),
                ...((currentActiveStepIndexVal && index > currentActiveStepIndexVal - 1
                  && getInactiveLineSeparatorStyles && getInactiveLineSeparatorStyles(step, index)) || {})
              }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;