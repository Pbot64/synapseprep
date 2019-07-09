// Node Modules
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Pdf from "../assets/pdf/book.pdf";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import ProgressMobileStepper from '../components/Stepper';

// Local Components
// import Lessons from '../components/Lessons';
// import right_arrow from '../assets/images/right_arrow.svg';
// import ButtonCustom from '../assets/jss/components/ButtonCustom';
// import LinkCustom from '../assets/jss/components/LinkCustom';

// Local Assets

//  Style Overrides
const styles = theme => ({
  root: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paragraph: {
    marginTop: 50,
    lineHeight: 2
  },
  arrowsContainer: {
    marginTop: 100
  },
  title: {
    marginBottom: "20px"
  },
  subtitle: { maxWidth: "600px", marginBottom: "100px" }
});

const Intro = props => {
  const { classes } = props;
  return (
    <div>
      <div className={classes.root}>
        <Grid container align="center" direction="column">
          <Typography
            variant="h3"
            className={classes.title}
            color="textPrimary"
          >
            Welcome to the SAT Course!
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.subtitle}
          >
            Unfortunately, our interactive, high-tech SAT course isn't quite
            finished. In the meantime, we invite you to start getting familier
            with the SAT by reading the prep-book version of the course.
          </Typography>
        </Grid>
        <iframe
          title="SAT Prep Book Intro"
          src={Pdf}
          height="1000"
          width="800"
        />
        {/* <ProgressMobileStepper />
        <div className={classes.arrowsContainer}>
          <LinkCustom to={`${match.url}/:whatIsTheSAT`}>
            <img src={right_arrow} alt={right_arrow} width="40" />
          </LinkCustom>
        </div> */}
      </div>
    </div>
  );
};

Intro.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Intro);
