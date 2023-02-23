import React, { FC } from "react";
import { IBubbleProps } from "./types";
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES } from '../constants';
import styles from './styles';
const Bubble: FC<IBubbleProps> = (props) => {
  const {
    step,
    enableStepClick,
    renderAdornment,
    index,
    currentActiveStepIndexVal,
    handleStepClick,
    getBubbleStyles,
    getActiveBubbleStyles,
    getInActiveBubbleStyles
  } = props;
  return (
    <div
      style={{...styles.eachBubble,
        ...((getBubbleStyles && getBubbleStyles(step, index)) || {}),
        ...((enableStepClick && styles.cursorPointer) || {}),
        ...((index === currentActiveStepIndexVal) && styles.activeStepBubble || {}),
        ...((index === currentActiveStepIndexVal && getActiveBubbleStyles && getActiveBubbleStyles(step, index)) || {}),
        ...((step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index) && styles.inactiveStepBubble || {}),
        ...((step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index
            && getInActiveBubbleStyles && getInActiveBubbleStyles(step, index)) || {})
      }}
      onClick={(): void => handleStepClick(index)}
      role="presentation"
      data-testId="stepper-bubble"
    >
      {(renderAdornment && renderAdornment(step, index))
    || (
      <>
        {step?.status === STEP_STATUSES.COMPLETED && (
          <img
            src={whiteTick}
            style={styles.whiteTickImg}
            alt=""
          />)
        || index + 1}
      </>
    )}
    </div>
  );
};

export default Bubble;