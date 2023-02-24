import React, { FC } from "react";
import type { IBubbleProps } from "./types";
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES } from '../constants';
import styles from './styles.module.scss';
const Bubble: FC<IBubbleProps> = (props) => {
  const {
    step,
    renderAdornment,
    index,
    currentStepIndex,
    handleStepClick = null,
    getBubbleStyles,
    getActiveBubbleStyles,
    getInActiveBubbleStyles
  } = props;
  return (
    <div
      className={`${styles.eachBubble}
      ${handleStepClick && styles.cursorPointer}
      ${index === currentStepIndex && styles.activeStepBubble}
      ${step.status === STEP_STATUSES.UNVISITED && currentStepIndex !== index && styles.inactiveStepBubble}
      `}
      style={{
        ...((getBubbleStyles && getBubbleStyles(step, index)) || {}),
        ...((index === currentStepIndex && getActiveBubbleStyles && getActiveBubbleStyles(step, index)) || {}),
        ...((step.status === STEP_STATUSES.UNVISITED && currentStepIndex !== index
            && getInActiveBubbleStyles && getInActiveBubbleStyles(step, index)) || {})
      }}
      onClick={(): void | null => handleStepClick && handleStepClick()}
      role="presentation"
      data-testId="stepper-bubble"
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