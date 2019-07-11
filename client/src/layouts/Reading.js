// Node Modules
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material UI Components

// Local Components
import Lessons from "../components/Lessons";

// Local Assets

//  Style Overrides
const styles = theme => ({});

const Reading = () => {
  return (
    <React.Fragment>
      <Lessons />
    </React.Fragment>
  );
};

Reading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reading);
