import React, { FC } from "react";
import type { INodeProps } from "./types";
import { Elements } from "../constants";
import whiteTick from '../assets/white-tick.svg';
import styles from './styles.module.scss';

const Node: FC<INodeProps> = (props) => {
  const {
    step,
    renderNode,
    index,
    currentStepIndex,
    handleStepClick,
    showCursor,
    getStyles
  } = props;

  return (
    <div
      className={`${styles.eachBubble}
      ${showCursor && styles.cursorPointer}
      ${index === currentStepIndex && styles.activeStepBubble}
      ${!step.completed && currentStepIndex !== index && styles.inactiveStepBubble}
      ${step.completed && currentStepIndex !== index && styles.completedStepBubble}
      `}
      style={{
        ...((getStyles(Elements.Bubble)) || {}),
        ...((index === currentStepIndex && getStyles(Elements.ActiveBubble)) || {}),
        ...((!step.completed && currentStepIndex !== index
            && getStyles(Elements.InActiveBubble)) || {})
      }}
      onClick={(): void | null => handleStepClick && handleStepClick()}
      role="presentation"
      id="stepper-bubble"
    >
      {(renderNode && renderNode(step, index))
    || (
      <>
        {step?.completed && (
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

export default Node;