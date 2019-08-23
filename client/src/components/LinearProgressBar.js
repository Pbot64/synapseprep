/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import wavePattern from '../assets/images/wavePattern.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '80%'
  },
  colorPrimary: {
    background:
      'url(' +
      wavePattern +
      '), linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)'
  },
  barColorPrimary: {
    background:
      'url(' +
      wavePattern +
      '), linear-gradient(224deg, #ee5087, #ef5186 1%, #f05784 7%, #ffbe5f 100%)',
    backgroundBlendMode: 'color-burn'
  }
});

function LinearProgressBar(props) {
  const { classes } = props;
  const [completed, setCompleted] = React.useState(0);

  function progress() {
    if (completed === 100) {
      setCompleted(0);
    } else {
      const diff = Math.random() * 10;
      setCompleted(Math.min(completed + diff, 100));
    }
  }

  React.useEffect(() => {
    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        classes={{
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary
        }}
        variant="determinate"
        value={completed}
      />
    </div>
  );
}

export default withStyles(styles)(LinearProgressBar);
