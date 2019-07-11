// Node Modules
import React from "react";
import { withStyles } from "@material-ui/core/styles";

// Material UI Components
import Grid from "@material-ui/core/Grid";

// Local Components
import QuestionFeed from "./QuestionFeed";
import ContinueLesson from "./ContinueLesson";
import EstimatedScores from "./EstimatedScores";
import Alert from "../../components/Alert";

// Local Assets

//  Style Overrides
const styles = theme => ({});

const Dashboard = props => {
  return (
    <React.Fragment>
      <Alert />
      <Grid container spacing={24} justify="space-between">
        <QuestionFeed />
        <ContinueLesson />
      </Grid>
      <EstimatedScores />
    </React.Fragment>
  );
};

export default withStyles(styles)(Dashboard);
