// Node Modules
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonCustom from "../assets/jss/components/ButtonCustom";
import LinkCustom from "../assets/jss/components/LinkCustom";


// Local Components
import CardCustom from "../assets/jss/components/CardCustom.js";

// Local Assets
import students from "../assets/images/students.jpg";

//  Style Overrides
const styles = theme => ({
  videoContainer: {
    marginTop: "50px",
    maxWidth: "750px"
  },
  title: {
    fontSize: "1.75rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.75rem"
    }
  },
  img: { marginTop: "30px", width: "100%" }
});

const UnderConstruction = props => {
  const { classes } = props;
  return (
    <React.Fragment>
        <Grid container justify="flex-start">
        <LinkCustom to="/dashboard">
          <ButtonCustom arrowLeft>Return to Dashboard</ButtonCustom>
        </LinkCustom>
      </Grid>
      <Grid container justify="center">
        <Grid item className={classes.videoContainer}>
          <CardCustom padding >
            <Grid container align="center" direction="column">
              <Typography variant="h3" align="center" className={classes.title}>
                Under Construction
              </Typography>
              <img className={classes.img} src={students} alt="students" />
            </Grid>
          </CardCustom>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

UnderConstruction.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UnderConstruction);
