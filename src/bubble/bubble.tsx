import React, { FC } from "react";
import { IBubbleProps } from "./types";
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES } from '../constants';
import styles from './styles.module.scss';
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
      className={`${styles.eachBubble}
      ${enableStepClick && styles.cursorPointer}
      ${index === currentActiveStepIndexVal && styles.activeStepBubble}
      ${step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index && styles.inactiveStepBubble}
      `}
      style={{
        ...((getBubbleStyles && getBubbleStyles(step, index)) || {}),
        ...((index === currentActiveStepIndexVal && getActiveBubbleStyles && getActiveBubbleStyles(step, index)) || {}),
        ...((step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index
            && getInActiveBubbleStyles && getInActiveBubbleStyles(step, index)) || {})
      }}
      onClick={(): void => handleStepClick(index)}
      role="presentation"
    >
      {(renderAdornment && renderAdornment(step, index))
    || (
      <>
        {step?.status === STEP_STATUSES.COMPLETED && (
          <img
            src={whiteTick}
            className={styles.whiteTickImg}
            alt=""
          />)
        || index + 1}
      </>
    )}
    </div>
  );
};

export default Bubble;