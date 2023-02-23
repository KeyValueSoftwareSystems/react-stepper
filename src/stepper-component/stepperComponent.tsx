import React, { useState, useEffect, ReactElement, FC } from 'react';
import styles from './styles.module.scss';
import { IStep, IStepperProps } from './types';
import Bubble from '../bubble';
import { LABEL_POSITION } from '../constants';

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

  const [currentActiveStepIndexVal, setCurrentActiveStepIndexVal] = useState<number>(0);

  useEffect(() => {
    setCurrentActiveStepIndexVal((currentActiveStepIndex ?? 0) as  number);
  }, [currentActiveStepIndex]);

  const handleStepClick = (stepIndex: number): void => {
    if (enableStepClick) {
      if (onStepClick) onStepClick(stepIndex);
      else setCurrentActiveStepIndexVal(stepIndex);
    }
  }

  return (
    <div className={styles.stepperContainer}>
      {steps?.map((step: IStep, index: number): ReactElement => (
        <div key={index} className={styles.eachStep} data-testId="stepper-steps">
          <div className={styles.bubbleLineWrapper}>
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
            <div className={`${styles.labelContainer} ${styles[`labelContainer__${labelPosition || LABEL_POSITION.RIGHT}`]}`}>
              {step?.label && (
                <span
                  className={`${styles.labelTitle}
                  ${enableStepClick && styles.cursorPointer}
                  ${index === currentActiveStepIndexVal && styles.activeLabelTitle}`}
                  style={{
                    ...((getLabelTitleStyles && getLabelTitleStyles(step, index)) || {}),
                    ...((index === currentActiveStepIndexVal && getActiveLabelTitleStyles && getActiveLabelTitleStyles(step, index)) || {})
                  }}
                  onClick={(): void => handleStepClick(index)}
                  role="presentation"
                  data-testId={`stepper-label-${index}`}
                >
                  {step.label}
                </span>
              )}
              {step?.description && (
                <span
                  className={`${styles.labelDescription}
                  ${enableStepClick && styles.cursorPointer}
                  ${index === currentActiveStepIndexVal && styles.activeLabelDescription}`}
                  style={{
                    ...((getLabelDescriptionStyles && getLabelDescriptionStyles(step, index)) || {}),
                    ...((index === currentActiveStepIndexVal &&
                      getActiveLabelDescriptionStyles && getActiveLabelDescriptionStyles(step, index)) || {})
                  }}
                  onClick={(): void => handleStepClick(index)}
                  role="presentation"
                  data-testId={`stepper-desc-${index}`}
                >
                  {step.description}
                </span>
              )}
            </div>
            {index < steps?.length - 1 && (
              <div
                className={`${styles.lineSeparator}
                ${index > currentActiveStepIndexVal - 1 && styles.inactiveStepLineSeparator}`}
                style={{
                  ...((getLineSeparatorStyles && getLineSeparatorStyles(step, index)) || {}),
                  ...((index > currentActiveStepIndexVal - 1
                  && getInactiveLineSeparatorStyles && getInactiveLineSeparatorStyles(step, index)) || {})
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