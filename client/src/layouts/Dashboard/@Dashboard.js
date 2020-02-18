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
import { getProfile } from '../../actions/profileActions';

// Local Assets

//  Style Overrides
const styles = theme => ({
  progress: {
    color: 'grey'
  },
  progressContainer: {
    minHeight: '100%'
  }
});

class Dashboard extends React.Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    const { profile } = this.props.profile;
    if (profile === null || profile.length === 0) {
      this.props.getProfile();
    }
  }
  render() {
    const { classes } = this.props;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || profile.length === 0 || loading) {
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

export default withStyles(styles)(connect(mapStatetoProps, { getProfile })(Dashboard));
