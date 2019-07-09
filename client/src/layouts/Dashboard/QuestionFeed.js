// Node Modules
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// Material UI Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Local Components
import CardCustom from "../../assets/jss/components/CardCustom";
import QuestionFeedTabs from "./QuestionFeedTabs";

// Local Assets

//  Style Overrides
const styles = theme => ({
  bottomText: {
    color: `${theme.palette.text.lightGrey}`
  },
  cardBottomContainer: {
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    padding: 5,
    backgroundColor: "white",
    borderTop: "solid 1px lightgrey"
  },
  topCardContainer: {
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px"
  },
  title: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.87)",
    paddingBottom: "10px"
  }
});

class QuestionFeed extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item md={7} xs={12}>
          <CardCustom
            title="Question Feed"
            borderBottom
            className={classes.topCardContainer}
          >
            <Grid item container align="center" direction="column">
              <QuestionFeedTabs />
            </Grid>
          </CardCustom>
          <div className={classes.cardBottomContainer}>
            <Grid container align="center" direction="column">
              <Typography variant="subtitle2" className={classes.bottomText}>
                Hand picked questions to strengthen your weakest skills.
              </Typography>
            </Grid>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}

QuestionFeed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(QuestionFeed);
