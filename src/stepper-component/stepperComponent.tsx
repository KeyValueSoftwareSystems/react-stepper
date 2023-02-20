/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from 'react';
import './styles.css';
import { Istep, IstepperProps } from './types';
import whiteTick from '../assets/white-tick.svg';

const Stepper = (props: IstepperProps): any => {
  const { steps, currentActiveStepIndex } = props;

  // const whiteTick = require('../assets/white-tick.svg') as string;
  const [stepsVal, setSteps] = useState<Istep[]>([]);
  const [currentActiveStepIndexVal, setCurrentActiveStepIndexVal] = useState<number>()

  useEffect(() => {
    setSteps(steps);
  }, [steps]);

  useEffect(() => {
    setCurrentActiveStepIndexVal(currentActiveStepIndex ?? 0);
  }, [currentActiveStepIndex]);

  return (
    <div className="stepperContainer">
      {stepsVal?.map((step: Istep, index: number) => (
        <div key={index} className="eachStep">
          <div className='bubbleLineWrapper'>
            <div
              className={`eachBubble
              ${index === currentActiveStepIndexVal && 'activeStepBubble'}
              ${index > currentActiveStepIndexVal && 'inactiveStepBubble'}`}
            >
              {currentActiveStepIndexVal > index && (
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
                <span className='labelTitle'>
                  {step?.label}
                </span>
              )}
              {step?.description && (
                <span className='labelDescription'>
                  {step?.description}
                </span>
              )}
            </div>
            {index < stepsVal?.length - 1 && (
              <div className={`lineSeparator ${(index > currentActiveStepIndexVal - 1) && 'activeStepLineSeparator'}`} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;