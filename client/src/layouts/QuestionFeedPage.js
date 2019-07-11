// Node Modules
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Local Components
import Question from "../components/Question";
import ProgressMobileStepper from "../components/Stepper";
import ButtonCustom from "../assets/jss/components/ButtonCustom";
import LinkCustom from "../assets/jss/components/LinkCustom";

// Material UI Components
import Grid from "@material-ui/core/Grid";

// Local Assets

//  Style Overrides
const styles = theme => ({
  questionContainer: {
    marginTop: "150px"
  },
  stepperContainer: {
    marginTop: "250px"
  }
});

const QuestionFeedPage = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Grid container justify="flex-end">
        <LinkCustom to="/dashboard">
          <ButtonCustom arrowRight>Return to Dashboard</ButtonCustom>
        </LinkCustom>
      </Grid>
      <Grid
        item
        container
        justify="center"
        className={classes.questionContainer}
      >
        <Grid item container xs={12} sm={6} justify="center">
          <Question />
          <Grid
            item
            container
            xs={12}
            justify="center"
            className={classes.stepperContainer}
          >
            <ProgressMobileStepper />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

QuestionFeedPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionFeedPage);
