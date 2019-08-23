// Node Modules
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Local Components
import QuestionFeed from './QuestionFeed';
import ContinueLesson from './ContinueLesson';
import EstimatedScores from './EstimatedScores';
import Alert from '../../components/Alert';
import { setPractice } from '../../actions/profileActions';

// Local Assets

//  Style Overrides
const styles = theme => ({
  progress: {
    color: 'grey'
  },
  progressContainer: {
    height: '-webkit-fill-available'
  }
});

class Dashboard extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    const { practice } = this.props.profile;
    if (practice === null || practice.length === 0) {
      this.props.setPractice();
    }
  }
  render() {
    const { classes } = this.props;
    const { practice, loading } = this.props.profile;

    let dashboardContent;
    if (practice === null || practice.length === 0 || loading) {
      dashboardContent = (
        <Grid container justify="center" alignItems="center" className={classes.progressContainer}>
          <CircularProgress className={classes.progress} />
        </Grid>
      );
    } else {
      dashboardContent = (
        <React.Fragment>
          <Alert />
          <Grid container spacing={24} justify="space-between">
            <QuestionFeed />
            <ContinueLesson />
          </Grid>
          <EstimatedScores />
        </React.Fragment>
      );
    }
    return <React.Fragment>{dashboardContent}</React.Fragment>;
  }
}

const mapStatetoProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { setPractice }
  )(Dashboard)
);
