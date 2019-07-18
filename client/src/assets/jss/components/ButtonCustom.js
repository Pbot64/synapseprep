import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

// Local assets
import chevronLeft from "../../../assets/images/chevron-left.svg";
import chevronRight from "../../../assets/images/chevron-right.svg";

const styles = theme => ({
  root: {
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    color: "black",
    display: "flex",
    fontSize: "inherit",
    fontStyle: "normal",
    fontWeight: 500,
    letterSpacing: "2px",
    position: "relative",
    textTransform: "uppercase",
    transition: "transform 0.3s",
    zIndex: "10",
    "&:hover": {
      transform: "translateY(1px)"
    }
  },
  arrowRight: {
    "&:after": {
      background: `url(${chevronRight}) no-repeat`,
      content: '""',
      height: "14px",
      marginLeft: "10px",
      transition: "0.5s",
      width: "14px"
    },
    "&:hover:after": {
      transform: "translateX(5px)"
    }
  },
  arrowLeft: {
    "&:before": {
      background: `url(${chevronLeft}) no-repeat`,
      content: '""',
      height: "14px",
      marginRight: "10px",
      transition: "0.5s",
      width: "14px"
    },
    "&:hover:before": {
      transform: "translateX(-5px)"
    }
  }
});

const ButtonCustom = props => {
  const {
    classes,
    className,
    arrowRight,
    arrowLeft,
    children,
    ...rest
  } = props;
  return (
    <Button
      className={classNames(
        classes.root,
        {
          [classes.arrowLeft]: arrowLeft,
          [classes.arrowRight]: arrowRight
        },
        className
      )}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default withStyles(styles)(ButtonCustom);
