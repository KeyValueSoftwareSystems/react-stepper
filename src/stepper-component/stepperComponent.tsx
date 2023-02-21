import React, { useState, useEffect, ReactElement } from 'react';
import './styles.css';
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
    <div className="stepperContainer">
      {steps?.map((step: Istep, index: number): ReactElement => (
        <div key={index} className="eachStep">
          <div className='bubbleLineWrapper'>
            <div
              className={`eachBubble
              ${enableStepClick && 'cursorPointer'}
              ${index === currentActiveStepIndexVal && 'activeStepBubble'}
              ${(step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index) && 'inactiveStepBubble'}`}
              onClick={(): void => handleStepClick(index)}
            >
              {step?.status === STEP_STATUSES.COMPLETED && (
                <img
                  src={whiteTick}
                  className="whiteTickImg"
                  alt=""
                />
              )
              || index + 1}
            </div>
            <div className='eachLabel'>
              {step.label && (
                <span className={`labelTitle ${index === currentActiveStepIndexVal && 'activeLabelTitle'}`}>
                  {step?.label}
                </span>
              )}
              {step?.description && (
                <span className={`labelDescription ${index === currentActiveStepIndexVal && 'activeLabelDescription'}`}>
                  {step?.description}
                </span>
              )}
            </div>
            {index < steps?.length - 1 && (
              <div className={`lineSeparator ${(index > currentActiveStepIndexVal - 1) && 'activeStepLineSeparator'}`} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;