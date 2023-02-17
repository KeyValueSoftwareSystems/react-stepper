import React, { useState, useEffect } from 'react';
import './styles.css';
import { stepTypes } from './types';

const Stepper = (props: { steps: stepTypes[]}): any => {
  const { steps } = props;

  const [stepVal, setSteps] = useState([]);

  useEffect(()      => {
    setSteps(steps);
  }, [steps]);
  return (
    <div className="stepperContainer">
      {stepVal?.map((step, index) => (index < stepVal?.length - 1) && (
        <div key={index} className="eachStep">
          <div className='bubbleLineWrapper'>
            <div className='eachBubble'>{index + 1}</div>
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
            <div className='lineSeparator' />
          </div>
        </div>
      ))}
      <div className="eachStep">
        <div className='bubbleLineWrapper'>
          <div className='eachBubble'>
            {stepVal?.length}
          </div>
          <div className='eachLabel'>
            {stepVal[stepVal?.length - 1]?.label && (
              <span className='labelTitle'>
                {stepVal[stepVal?.length - 1]?.label}
              </span>
            )}
            {stepVal[stepVal?.length - 1]?.description && (
              <span className='labelDescription'>
                {stepVal[stepVal?.length - 1]?.description}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;