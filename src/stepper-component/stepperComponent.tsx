import React, { useState, useEffect } from 'react';
import './styles.css';
interface stepTypes {
  label: string
}
const Stepper = (props: { steps: stepTypes[]}) => {
  const { steps } = props;
  const [stepVal, setSteps] = useState([]);
  useEffect(() => {
    setSteps(steps);
  }, [steps])
  return (
  <div className="stepperContainer">
    {stepVal?.map((e, index) => (
      <div className="eachStep">
        <div className='stepSection'>
          <div className='eachBubble'>{index + 1}</div>
          <div className='eachLabel'>{e?.label}</div>
        </div>   
      </div>
    ))}
  </div>
  );
};

export default Stepper;