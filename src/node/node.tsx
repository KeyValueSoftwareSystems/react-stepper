import React, { FC } from "react";
import type { INodeProps } from "./types";
import { Elements } from "../constants";
import whiteTick from "../assets/white-tick.svg";
import styles from "./styles.module.scss";

/**
 * Represents each node in the stepper
 * Handles style addition to each node separately
 * Handles click event of each node
 * @param {INodeProps} props
 * @returns {FC}
 */
const Node: FC<INodeProps> = (props) => {
  const {
    step,
    renderNode,
    index,
    currentStepIndex,
    handleStepClick,
    showCursor,
    getStyles,
    nodeStyle
  } = props;

  const isCompleted = step.completed;
  const isActive = index === currentStepIndex;

  return (
    <div
      className={`${styles.eachNode}
      ${showCursor && styles.cursorPointer}
      ${isActive && styles.activeStepNode}
      ${!isCompleted && !isActive && styles.inactiveStepNode}
      ${isCompleted && !isActive && styles.completedStepNode}
      `}
      style={nodeStyle}
      onClick={(): void | null => handleStepClick && handleStepClick()}
      role="presentation"
      id="stepper-node"
    >
      {(renderNode && renderNode(step, index))
    || (
      <>
        {isCompleted ? (
          <img
            src={whiteTick}
            className={styles.whiteTickImg}
            alt=""
          />
        ) : (
          index + 1
        )}
      </>
    )}
    </div>
  );
};

export default Node;
