import React, { FC } from "react";
import classes from "./styles.module.scss";

type ConnectorProps = {
  type?: "dotted" | "solid";
};

const Connector: FC<ConnectorProps> = (props) => (
  <div className={classes.connector} />
);

Connector.defaultProps = {
  type: "dotted",
};

export default Connector;
