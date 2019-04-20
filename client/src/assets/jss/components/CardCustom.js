import React from 'react'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    borderRadius: 10,
    background: '#fff',
    boxShadow: '0 18px 56px -18px rgba(22,45,61,.18)',
    marginTop: 18,
  },
  title: {
    paddingBottom: 10,
  },
  borderBottom: {
    borderBottom: `1px solid black`,
  },
});

const CardStyled = (props) => {
  const { classes, className, title, borderBottom } = props;
  return (
    <React.Fragment>
      <Typography component="h5" variant="h5" className={classNames(
        classes.title, {
          [classes.borderBottom]: borderBottom,
        },
        className)}
      >
        {title}
      </Typography>
      <Card className={classNames(classes.root, className)}> {props.children} </Card>
    </React.Fragment>
  )
};

export default withStyles(styles)(CardStyled);