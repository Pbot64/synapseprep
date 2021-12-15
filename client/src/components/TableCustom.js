// Node Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JsxParser from 'react-jsx-parser';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';

// Local Components
import E from './E/@Equation';
import T from './T/@Text';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Grid
} from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    height: '30px',
    padding: '0px 15px',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '40px',
      color: 'white'
    },
    '& > p': {
      fontWeight: '500'
    },
    '&:not(:last-child)': {
      borderRight: '1px solid white'
    }
  },
  body: {
    fontSize: 14,
    border: '1px solid rgba(224, 224, 224, 1)',
    padding: '8px 10px'
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    boxShadow: 'none'
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer'
    }
  },
  head: {
    ...theme.palette.blueToGreen,
    height: 'auto'
  },
  rowRoot: {
    height: '36px'
  }
});

const TableCustom = props => {
  const { classes, head, rows, fullWidth } = props;
  // State Declarations
  // const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState('');

  const handleClick = name => {
    if (selected === name) {
      setSelected('');
    } else {
      setSelected(name);
    }
  };

  const headData = head.split(',');

  return (
    <Grid container justify='center'>
      <Grid item xs={12} sm={fullWidth ? 12 : 8}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow classes={{ head: classes.head }}>
                {/* <TableCell padding="checkbox" /> */}
                {headData.map((header, i) => (
                  <CustomTableCell align={i > 0 ? 'right' : 'inherit'}>
                    <Typography variant='body1' color='inherit'>
                      {header}
                    </Typography>
                  </CustomTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  selected={i === selected}
                  onClick={() => {
                    handleClick(i);
                  }}
                  className={classes.row}
                  classes={{ root: classes.rowRoot, selected: classes.selected }}
                  key={i}
                >
                  {/* <CustomTableCell>
                <Checkbox color="primary" checked={row.id === selected} />
              </CustomTableCell> */}
                  {row.map((cell, i) => (
                    <React.Fragment key={i}>
                      <CustomTableCell align={i === 0 ? 'inherit' : 'right'}>
                        <JsxParser
                          renderInWrapper={false}
                          components={{ Grid, Typography, E, T }}
                          jsx={cell}
                        />
                      </CustomTableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

TableCustom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableCustom);
