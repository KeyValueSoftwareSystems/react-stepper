import React, { FC } from "react";
import type { INodeProps } from "./types";
import { Elements } from "../constants";
import whiteTick from "../assets/white-tick.svg";
import styles from "./styles.module.scss";

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
      className={`${styles.eachNode}
      ${showCursor && styles.cursorPointer}
      ${index === currentStepIndex && styles.activeStepNode}
      ${!step.completed && currentStepIndex !== index && styles.inactiveStepNode}
      ${step.completed && currentStepIndex !== index && styles.completedStepNode}
      `}
      style={{
        ...((getStyles(Elements.Node)) || {}),
        ...((index === currentStepIndex && getStyles(Elements.ActiveNode)) || {}),
        ...((step.completed && getStyles(Elements.CompletedNode)) || {}),
        ...((!step.completed && currentStepIndex !== index
            && getStyles(Elements.InActiveNode)) || {})
      }}
      onClick={(): void | null => handleStepClick && handleStepClick()}
      role="presentation"
      id="stepper-node"
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
